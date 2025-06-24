"use client";

import DashboardPage from "./DashboardPage"
import Loading from "@/components/Loading";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export default function Dashboard() {
  const { loading, validated, email, name, validate } = useAuth();

  useEffect(() => {
    if (!validated && !loading) {
      validate();
    }
  }, [validate, validated, loading]);

  if (loading || !validated) {
    return <Loading />;
  }

  return <DashboardPage email={email} name={name} />;
}