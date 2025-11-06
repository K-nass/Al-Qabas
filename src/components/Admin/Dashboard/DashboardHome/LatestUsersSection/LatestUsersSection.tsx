import { apiClient } from "@/api/client";
import DataTableHeader from "../DataTableSection/DataTableHeader";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Loader/Loader";
import UserCard from "./UserCard/UserCard";

export interface UserInterface {
  id: string;
  userName: string;
  email: string;
  avatarImageUrl: string | null;
  isActive: boolean;
  emailConfirmed: boolean;
  createdAt: string;
  role: string;
}
export default function LatestUsersSection() {

  async function fetchLatestUsers() {
    const res = await apiClient.get("/users/all", {
      params: {
        Role: "",
        IsActive: true,
        EmailConfirmed: true,
        PageNumber: 1,
        PageSize: 15,
        SearchPhrase: ""
      }
    });
    return res.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["latestUsers"],
    queryFn: fetchLatestUsers,
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <DataTableHeader
        label="Latest Users"
        description="Recently registered users"
      />
      <div className="p-6">
        <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
          {isLoading ? (
            <Loader />
          ) : (
            data?.items?.slice(0, 5).map((user: UserInterface) => <UserCard key={user.id} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
}


