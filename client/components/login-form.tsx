import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginAdminMutation } from "@/redux/api/admin.api"
import { useRouter } from "next/navigation"
import z from "zod"
import { SIGNIN_REQUEST } from "@/type/Admin"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import clsx from "clsx"
import { Spinner } from "./ui/spinner"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [login, { isLoading }] = useLoginAdminMutation()
    const router = useRouter()

    const loginSchema = z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1),
    }) satisfies z.ZodType<SIGNIN_REQUEST>

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<SIGNIN_REQUEST>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    })

    const handleLogin = async (data: SIGNIN_REQUEST) => {
        try {
            await login(data).unwrap()
            toast.success("Admin Login Success")
            reset()
            router.push("/admin")
        } catch (error) {
            console.log(error)
            toast.error("unable to login")
        }
    }

    // const handleClasses = (key: keyof SIGNIN_REQUEST) =>
    //   clsx(
    //     "mt-2",
    //     "border",
    //     "rounded-md",
    //     "px-3 py-2",
    //     "bg-background text-foreground", // ✅ theme support
    //     "focus:outline-none focus:ring-2 focus:ring-orange-500",
    //     errors[key] && "border-red-500",
    //     touchedFields[key] && !errors[key] && "border-green-500"
    //   )


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-background text-foreground border">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    {...register("email")}
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                // className={handleClasses("email")}
                                />
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.email?.message}
                                </div>
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    {...register("password")}
                                    type="password"
                                    placeholder='************'
                                    required
                                // className={handleClasses("password")}
                                />
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.password?.message}
                                </div>
                            </Field>
                            <Field>
                                <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                                    {isLoading && <Spinner />}
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                                <Button variant="outline" type="button">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="#">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
