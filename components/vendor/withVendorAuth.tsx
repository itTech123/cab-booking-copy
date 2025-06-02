"use client"
import { useEffect, useState, ComponentType, JSX } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function withVendorAuth<P>(WrappedComponent: ComponentType<P>) {
  const AuthenticatedComponent = (props: P & JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axios.get("/api/vendor/verify");
          setLoading(false);
        } catch (err) {
          router.push("/vendor/login");
        }
      };

      checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}

export default withVendorAuth;
