"use client";

import { useRouter } from "next/navigation";
import { MenuSwitch, SecondRow } from "@/components/organisms";
import { Button, Avatar, Tag, Input } from "@/components/atoms";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();

  // Mock user data
  const user = {
    name: "Katya Ivanova",
    role: "HR ADMINISTRATOR",
    email: "katya@hiredwired.com",
    phone: "+1 (555) 123-4567",
    department: "Human Resources",
    joinDate: "January 2023",
    avatarSrc: "/assets/avatar-katya.png",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="px-[30px] border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between py-[14px]">
          <div className="flex items-center gap-[30px]">
            <span 
              className="text-h2 italic cursor-pointer"
              onClick={() => router.push("/")}
            >
              Hired & Wired
            </span>
            <div className="flex">
              <MenuSwitch label="All teams" onClick={() => router.push("/")} />
              <MenuSwitch label="All templates" />
            </div>
          </div>
          <div className="flex items-center gap-[14px]">
            <button className="px-[20px] py-[8px] bg-gray-200 rounded-full text-pixel hover:bg-gray-300 transition-colors">
              Generate report
            </button>
            <div className="flex items-center gap-[8px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-gray-200">
                <img src={user.avatarSrc} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-pixel text-black">Profile</span>
            </div>
          </div>
        </div>
        
        <SecondRow 
          variant="breadcrumb"
          breadcrumbs={[
            { label: "Home" },
            { label: "Profile" },
          ]}
          onBack={() => router.push("/")}
        />
      </header>

      {/* Main Content */}
      <main className="p-[30px]">
        <div className="max-w-[800px] mx-auto">
          {/* Profile Hero */}
          <section className="relative overflow-hidden rounded-lg bg-yellow mb-[30px]">
            <div className="absolute inset-0">
              <Image
                src="/assets/Cover Image-4.jpg"
                alt="Cover"
                fill
                className="object-cover mix-blend-multiply opacity-50"
              />
            </div>
            <div className="relative z-10 p-[60px] flex flex-col items-center gap-[24px]">
              <Avatar src={user.avatarSrc} size={120} />
              <div className="text-center">
                <h1 className="text-h1 mb-[14px]">{user.name}</h1>
                <p className="text-description">{user.role}</p>
              </div>
            </div>
          </section>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            {/* Contact Info */}
            <section className="p-[30px] bg-white rounded-lg">
              <h2 className="text-h2 mb-[24px]">Contact Info</h2>
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Email</span>
                  <span className="text-pixel">{user.email}</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Phone</span>
                  <span className="text-pixel">{user.phone}</span>
                </div>
              </div>
            </section>

            {/* Work Info */}
            <section className="p-[30px] bg-white rounded-lg">
              <h2 className="text-h2 mb-[24px]">Work Info</h2>
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Department</span>
                  <span className="text-pixel">{user.department}</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-caps text-gray-400">Joined</span>
                  <span className="text-pixel">{user.joinDate}</span>
                </div>
              </div>
            </section>

            {/* Permissions */}
            <section className="p-[30px] bg-white rounded-lg md:col-span-2">
              <h2 className="text-h2 mb-[24px]">Permissions</h2>
              <div className="flex flex-wrap gap-[8px]">
                <Tag variant="static">Admin Access</Tag>
                <Tag variant="static">Team Management</Tag>
                <Tag variant="static">Campaign Creation</Tag>
                <Tag variant="static">Report Generation</Tag>
                <Tag variant="static">Automation Builder</Tag>
              </div>
            </section>

            {/* Actions */}
            <section className="p-[30px] bg-white rounded-lg md:col-span-2">
              <h2 className="text-h2 mb-[24px]">Account Actions</h2>
              <div className="flex gap-[14px]">
                <Button variant="secondary">Edit Profile</Button>
                <Button variant="secondary">Change Password</Button>
                <Button 
                  variant="secondary" 
                  onClick={() => router.push("/login")}
                  className="!bg-red !text-white"
                >
                  Sign Out
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

