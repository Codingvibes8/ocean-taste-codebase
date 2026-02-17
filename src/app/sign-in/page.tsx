'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingBag, Mail, Lock, User } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function SignInPage() {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpName, setSignUpName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sign in failed')
      }

      toast({
        title: 'Success',
        description: 'Signed in successfully',
      })

      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Sign in failed',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signUpEmail, password: signUpPassword, name: signUpName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed')
      }

      toast({
        title: 'Success',
        description: 'Account created successfully',
      })

      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Sign up failed',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:p-6 lg:p-8 bg-muted/50">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-14 rounded-lg" style={{ background: '#006994' }}>
              <span className="text-xl sm:text-2xl font-bold" style={{ color: '#ffffff' }}>SF</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold">Sushi Flex</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
                <TabsTrigger value="signin" className="text-sm sm:text-base py-2 sm:py-2.5">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-sm sm:text-base py-2 sm:py-2.5">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
                <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm sm:text-base flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="pl-9 sm:pl-10 h-10 sm:h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm sm:text-base flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="•••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="pl-9 sm:pl-10 h-10 sm:h-11"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12 text-base sm:text-lg"
                    style={{ backgroundColor: '#006994', color: '#ffffff' }}
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
                <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-sm sm:text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className="pl-9 sm:pl-10 h-10 sm:h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm sm:text-base flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="pl-9 sm:pl-10 h-10 sm:h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm sm:text-base flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="•••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="pl-9 sm:pl-10 h-10 sm:h-11"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12 text-base sm:text-lg"
                    style={{ backgroundColor: '#006994', color: '#ffffff' }}
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 sm:space-y-4 pt-4 sm:pt-6">
            <div className="text-sm text-muted-foreground text-center">
              <Link href="/" className="underline hover:text-primary transition-colors">
                ← Back to home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
