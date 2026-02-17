import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during sign out' },
      { status: 500 }
    )
  }
}
