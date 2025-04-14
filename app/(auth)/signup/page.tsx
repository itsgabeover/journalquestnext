// "use client";
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { SignUpProps } from "@/types";

// export default function SignUp({ setUser }: SignUpProps) {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//     first_name: "",
//     last_name: "",
//     nickname: "",
//     archetype: "",
//   });
//   const [errors, setErrors] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setErrors([]);
//     setLoading(true);

//     const validationErrors: string[] = [];
//     if (formData.password !== formData.password_confirmation)
//       validationErrors.push("Passwords don't match");
//     if (formData.password.length < 6)
//       validationErrors.push("Password must be at least 6 characters");
//     if (!formData.username) validationErrors.push("Username is required");
//     if (!formData.email) validationErrors.push("Email is required");

//     if (validationErrors.length) {
//       setErrors(validationErrors);
//       setLoading(false);
//       return;
//     }

//     fetch(`/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ user: formData }),
//     })
//       .then((res) => {
//         if (!res.ok) return res.json().then((err) => Promise.reject(err));
//         return res.json();
//       })
//       .then((user) => {
//         setUser(user);
//         router.push("/");
//       })
//       .catch((err) => {
//         setErrors(err.errors || [err.error] || ["Signup failed"]);
//       })
//       .finally(() => setLoading(false));
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12">
//       <Card className="w-full max-w-4xl p-6 space-y-8">
//         <h2 className="text-center text-3xl font-quicksand font-semibold text-leather-dark">
//           Begin Your Journey
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {errors.length > 0 && (
//             <div className="rounded-md bg-red-100 p-4 text-red-700">
//               <ul className="list-disc pl-5 space-y-1">
//                 {errors.map((e, i) => (
//                   <li key={i}>{e}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="username">Username</Label>
//               <Input name="username" value={formData.username} onChange={handleChange} required />
//             </div>
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
//             </div>
//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="password_confirmation">Confirm Password</Label>
//               <Input
//                 name="password_confirmation"
//                 type="password"
//                 value={formData.password_confirmation}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="first_name">First Name</Label>
//               <Input name="first_name" value={formData.first_name} onChange={handleChange} />
//             </div>
//             <div>
//               <Label htmlFor="last_name">Last Name</Label>
//               <Input name="last_name" value={formData.last_name} onChange={handleChange} />
//             </div>
//             <div>
//               <Label htmlFor="nickname">Nickname</Label>
//               <Input name="nickname" value={formData.nickname} onChange={handleChange} />
//             </div>
//             <div>
//               <Label htmlFor="archetype">Archetype</Label>
//               <select
//                 name="archetype"
//                 value={formData.archetype}
//                 onChange={handleChange}
//                 className="w-full rounded-md border border-gray-300 px-3 py-2"
//               >
//                 <option value="">Select your archetype</option>
//                 <option value="Seeker">Seeker</option>
//                 <option value="Innocent">Innocent</option>
//                 <option value="Orphan">Orphan</option>
//                 <option value="Fool">Fool (Jester)</option>
//                 <option value="Sage">Sage</option>
//                 <option value="King">King</option>
//                 <option value="Creator">Creator</option>
//                 <option value="Rebel">Rebel</option>
//                 <option value="Magician">Magician</option>
//                 <option value="Caregiver">Caregiver</option>
//                 <option value="Lover">Lover</option>
//                 <option value="Warrior">Warrior</option>
//               </select>
//             </div>
//           </div>

//           <Button type="submit" size="lg" className="w-full bg-leather text-white hover:bg-leather-dark">
//             {loading ? "Creating Account..." : "Begin Your Journey"}
//           </Button>

//           <p className="text-center text-leather mt-4">
//             Already have an account?{' '}
//             <Link href="/login" className="text-leather-dark underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </Card>
//     </div>
//   );
// }