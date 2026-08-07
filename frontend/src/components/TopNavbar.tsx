interface UserProps {
  id: string;
  name: string;
  email: string;
}

import { useEffect, useState } from "react";
import api from "../api/api";

const TopNavbar = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isFetching || user) return;
      try {
        setIsFetching(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        console.log(token, "space", userId);

        if (!token) {
          console.error("No authorization token found.");
          return;
        }

        const response = await api.get(`/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response, "check");
        setUser(response.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(
          "Authorization fetch failed:",
          err.response?.data || err.message,
        );
      } finally {
        setIsFetching(false);
        // setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Extract the first name dynamically or fall back to a default placeholder
  console.log(user);
  const displayName = user?.name ? user.name : "User";
  return (
    <>
      <div className="flex ">
        <div className="flex pl-3 pt-3 pb-3 pr-30 border border-r-black border-b-black max-w-60 w-full items-center">
          📈 <p>FinPilot AI</p>
        </div>

        <div className="flex items-center justify-between px-5 max-w-full w-full border border-b-black p-3">
          <div className="pl-7">
            <p className="font-bold text-xl">Good Evening, {displayName}</p>
          </div>

          <div className="flex max-w-240 w-full gap-7">
            <div className="flex max-w-180 w-full gap-4 items-center">
              <div className="border flex p-2 items-center gap-2 max-w-[1900px] w-full rounded-lg border-[hsl(0,0%,80%)]">
                🔍{" "}
                <input
                  type="search"
                  placeholder="Search transactions, budgets..."
                  className="search-input w-full outline-none"
                />
              </div>
              <div className="border p-2 rounded-lg  border-[hsl(0,0%,80%)]">
                <select className="w-30 outline-none">
                  <option value="all">This week</option>
                  <option value="completed">This month</option>
                  <option value="pending">This year</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-7 ">
              <p>🔔</p>
              <p>🔅</p>
              <div className="flex ">
                <select className="outline-none">
                  <option value="all">AM</option>
                  <option value="completed">Profile</option>
                  <option value="pending">Edit</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
