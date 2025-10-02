import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MESSAGES } from "@/lib/message";
import { supabase } from "@/supabase-client";
import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const MyProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const getAccountDetails = async () => {
      const { data, error } = await supabase.from("users_profile").select();
      if (error) console.log(error);
      if (!data) return;
      const dataAccount = data[0];
      console.log("dataAccount", dataAccount);
      setFormData((prev) => ({
        ...prev,
        firstName: dataAccount.first_name || "",
        lastName: dataAccount.last_name || "0",
        phone: dataAccount.phone || "",
      }));
    };
    const getEmail = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("user", data);
      if (error) return console.log(error);
      const email = data?.user?.email;
      setFormData((prev) => ({
        ...prev,
        email: email || "",
      }));
    };
    getAccountDetails();
    getEmail();
  }, [submit]);

  const signIn = async () => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.currentPassword,
    });
    if (signInError) {
      toast.error("Invalid email or password");
      return;
    }
  };

  const updateEmail = async () => {
    try {
      const { error: authError } = await supabase.auth.updateUser({
        email: formData.email,
      });
      if (authError) {
        console.error(authError);
        toast.error("Failed to update Email");
        return;
      }
      toast.success(
        <div>
          Check your email inbox to confirm the change. <br />
          <a
            href="https://mail.google.com"
            target="_blank"
            className="underline text-blue-600"
          >
            Open your email
          </a>
        </div>
      );
    } catch (error) {
      toast.error(
        `You have requested too many email changes. Please try again later.`
      );
      console.log("error", error);
    }
  };

  const updatePassword = async () => {
    if (!formData.currentPassword) {
      toast.error("You must write currentPassword");
      return;
    }
    try {
      const { error: authError } = await supabase.auth.updateUser({
        password: formData.confirmPassword,
      });
      if (authError) {
        console.error(authError);
        toast.error("Failed to update password");
        return;
      }
      await signIn();
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateAccount = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");

    try {
      const { error } = await supabase
        .from("users_profile")
        .update({
          phone: formData.phone,
          first_name: formData.firstName,
          last_name: formData.lastName,
        })
        .eq("id", userId)
        .select();
      if (error) {
        console.error(error);
        toast.error("Failed to update changes");
        return;
      }
      if (formData.email !== "") await updateEmail();

      if (formData.confirmPassword && formData.newPassword)
        await updatePassword();

      toast.success(MESSAGES.account.update);
      setSubmit(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="flex flex-col">
          <Label htmlFor="firstName" className="mb-1 text-sm font-medium">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            placeholder="First Name"
            className="border px-3 py-2 rounded "
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <Label htmlFor="lastName" className="mb-1 text-sm font-medium">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            placeholder="Last Name"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-1 text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setSubmit(false);
            }}
            placeholder="Email"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <Label htmlFor="phone" className="mb-1 text-sm font-medium">
            Phone
          </Label>
          <Input
            id="phone"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
              setSubmit(false);
            }}
            placeholder="Phone"
            className="border px-3 py-2 rounded"
          />
        </div>
      </form>

      <form action="" className="grid mt-6 gap-4">
        {/* Password Changes */}
        <div className="flex flex-col">
          <Label htmlFor="currentPassword" className="mb-1 text-sm font-medium">
            Password Changes (leave blank to leave unchanged)
          </Label>
          <Input
            id="currentPassword"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            placeholder="Current Password"
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex md:items-center flex-col md:flex-row gap-4">
          {/* New Password */}
          <Input
            id="newPassword"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            placeholder="New Password"
            className="border px-3 py-2 rounded"
          />

          {/* Confirm Password */}
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            placeholder="Confirm Password"
            className="border px-3 py-2 rounded"
          />
        </div>
      </form>
      <div className="flex gap-2 justify-end">
        <Button className="hover:bg-[#bdbbbb93] w-fit px-6 py-3 rounded-[4px] text-black bg-white">
          Cancel
        </Button>
        <Button
          disabled={submit}
          onClick={updateAccount}
          className="w-fit px-6 py-3 rounded-[4px]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default MyProfile;
