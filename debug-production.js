// Debug production Supabase connection
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zufahploqfrlwtwiepey.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZmFocGxvcWZybHd0d2llcGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTUwOTUsImV4cCI6MjA3NDU3MTA5NX0.qjwNBSY1t_rk3BySudho-c-fFukscvhBL0blGblAyhw'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugProduction() {
  console.log('🔍 Debugging production Supabase connection...\n')
  
  // Test blog_posts table
  console.log('📝 Checking blog_posts table:')
  try {
    const { data: blogs, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(5)
    
    if (blogError) {
      console.error('❌ Blog error:', blogError.message)
      console.error('Full error:', blogError)
    } else {
      console.log('✅ Blog posts found:', blogs?.length || 0)
      if (blogs && blogs.length > 0) {
        console.log('📄 Sample blog:', blogs[0].title)
      } else {
        console.log('⚠️ No blog posts in database')
      }
    }
  } catch (err) {
    console.error('❌ Blog connection failed:', err.message)
  }

  // Test projects table
  console.log('\n🚀 Checking projects table:')
  try {
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .limit(5)
    
    if (projectError) {
      console.error('❌ Project error:', projectError.message)
      console.error('Full error:', projectError)
    } else {
      console.log('✅ Projects found:', projects?.length || 0)
      if (projects && projects.length > 0) {
        console.log('📄 Sample project:', projects[0].title)
      } else {
        console.log('⚠️ No projects in database')
      }
    }
  } catch (err) {
    console.error('❌ Project connection failed:', err.message)
  }

  // Check if tables exist
  console.log('\n🗄️ Checking if tables exist:')
  try {
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (tableError) {
      console.error('❌ Table check error:', tableError.message)
    } else {
      console.log('✅ Available tables:', tables?.map(t => t.table_name) || [])
    }
  } catch (err) {
    console.error('❌ Table check failed:', err.message)
  }
}

debugProduction()
