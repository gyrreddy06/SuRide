import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"passenger" | "driver" | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
        return;
      }

      // Check localStorage fallback
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) throw error;

      // Set a flag in localStorage to indicate user is logged in (as fallback)
      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!userType) {
      alert("Please select whether you're a passenger or driver");
      return;
    }

    setLoading(true);

    try {
      // Simulate registration API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (userType === "driver") {
        navigate("/driver-verification");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-4">
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-white flex justify-between items-center px-4 text-xs font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="i-lucide-signal h-3 w-3"></span>
          <span className="i-lucide-wifi h-3 w-3"></span>
          <span className="i-lucide-battery-full h-3 w-3"></span>
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">RideShare</span>
        </div>
      </div>

      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full rounded-full h-10">
              <TabsTrigger value="login" className="rounded-full text-sm">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-full text-sm">
                Register
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <CardContent className="space-y-3 px-0">
              <CardDescription className="text-center text-xs">
                Sign in to your account to continue
              </CardDescription>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-9 h-10 text-sm rounded-xl"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-xs">
                    Password
                  </Label>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-[10px]"
                    onClick={() => setActiveTab("forgot")}
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 h-10 text-sm rounded-xl"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-0 pt-2">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl text-sm"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        )}

        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit}>
            <CardContent className="space-y-3 px-0">
              <CardDescription className="text-center text-xs">
                Create a new account to get started
              </CardDescription>

              <div className="space-y-1.5">
                <Label htmlFor="userType" className="text-xs">
                  I want to:
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={userType === "passenger" ? "default" : "outline"}
                    className="flex items-center gap-1.5 h-14 rounded-xl text-xs"
                    onClick={() => setUserType("passenger")}
                  >
                    <User className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Passenger</span>
                      <span className="text-[10px]">Find rides</span>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "driver" ? "default" : "outline"}
                    className="flex items-center gap-1.5 h-14 rounded-xl text-xs"
                    onClick={() => setUserType("driver")}
                  >
                    <Car className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Driver</span>
                      <span className="text-[10px]">Offer rides</span>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-xs">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    className="pl-9 h-10 text-sm rounded-xl"
                    value={registerForm.fullName}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        fullName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="registerEmail" className="text-xs">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-9 h-10 text-sm rounded-xl"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-9 h-10 text-sm rounded-xl"
                    value={registerForm.phone}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="registerPassword" className="text-xs">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="registerPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 h-10 text-sm rounded-xl"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 h-10 text-sm rounded-xl"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-0 pt-2">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl text-sm"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        )}

        {activeTab === "forgot" && (
          <div>
            <CardContent className="space-y-3 px-0">
              <CardTitle className="text-lg text-center">
                Reset Password
              </CardTitle>
              <CardDescription className="text-center text-xs">
                Enter your email address and we'll send you a link to reset your
                password
              </CardDescription>

              <div className="space-y-1.5">
                <Label htmlFor="resetEmail" className="text-xs">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-9 h-10 text-sm rounded-xl"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2 px-0 pt-2">
              <Button className="w-full h-11 rounded-xl text-sm">
                Send Reset Link
              </Button>
              <Button
                variant="link"
                onClick={() => setActiveTab("login")}
                className="text-xs"
              >
                Back to login
              </Button>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AuthPage;
