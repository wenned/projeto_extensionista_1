import { supabase } from '@/lib/supabase'
import { verify } from 'jsonwebtoken'
import formidable from 'formidable-serverless'

export const config = {
  api: {
    bodyParser: false,
  },
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }
  
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }
    
    verify(token, JWT_SECRET)
    
    const form = new formidable.IncomingForm()
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erro ao processar arquivo:', err)
        return res.status(500).json({ error: 'Erro ao processar arquivo' })
      }
      
      // No formidable-serverless, a estrutura pode ser um pouco diferente
      const file = files.file || files.file?.[0]
      
      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' })
      }
      
      // Lê o arquivo como buffer
      const fs = require('fs')
      const fileBuffer = fs.readFileSync(file.filepath)
      
      const fileName = `${Date.now()}-${file.originalFilename || file.name}`
      
      const { data, error: uploadError } = await supabase.storage
        .from('escola-portal')
        .upload(fileName, fileBuffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false
        })
      
      if (uploadError) {
        console.error('Erro ao fazer upload:', uploadError)
        return res.status(500).json({ error: 'Erro ao fazer upload' })
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('escola-portal')
        .getPublicUrl(fileName)
      
      return res.status(200).json({
        url: publicUrl,
        fileName
      })
    })
  } catch (error) {
    console.error('Erro no upload:', error)
    return res.status(500).json({ error: 'Erro no upload' })
  }
}
