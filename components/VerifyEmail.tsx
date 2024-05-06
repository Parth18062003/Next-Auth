"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "./ui/form-error";
import { FormSuccess } from "./ui/form-success";

const VerifyEmail = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if(success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
    .then((data) => {
      setSuccess(data.success);
      setError(data.error);
    })
    .catch((error) => {
      setError("Something went wrong. Please try again.");
    });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 bg-slate-200 dark:bg-slate-800">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>Next Auth</CardTitle>
          <CardDescription>Verifying your email</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center py-3">
          {!error && !success && (
          <Loader />)
          }
          <FormSuccess message={success} />
          {!success && (
            <FormError message={error} />
          )}
        </CardContent>
        <CardContent className="flex justify-center items-center">
          <Link
            href="/auth/login"
            className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
