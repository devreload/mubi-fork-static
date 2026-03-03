import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center px-8 py-6">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">404</h1>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <span className="text-sm uppercase tracking-wider">Page Not Found</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-semibold">
                        Oops! This Scene Doesn't Exist
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        The page you're looking for seems to have been cut from the final edit. 
                        Let's get you back to the show.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/">
                        <Button size="lg" className="min-w-40">
                            <MoveLeft className="w-4 h-4 mr-1" />
                            Go Back
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}