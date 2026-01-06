import { supabase } from '@/lib/supabase'
import { verify } from 'jsonwebtoken'
import formidable from 'formidable'

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
    
    const form = formidable({})
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao processar arquivo' })
      }
      
      const file = files.file?.[0]
      
      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' })
      }
      
      const fileName = `${Date.now()}-${file.originalFilename}`
      
      const { data, error } = await supabase.storage
        .from('escola-portal')
        .upload(fileName, file)
      
      if (error) {
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
    return res.status(500).json({ error: 'Erro no upload' })
  }
}