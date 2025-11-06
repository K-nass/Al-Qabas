import { useQuery } from "@tanstack/react-query";
import DataTableSection from "./DataTableSection/DataTableSection";
import StatsCard from "./StatsCard/StatsCard";
import { apiClient } from "@/api/client";
import LatestUsersSection from "./LatestUsersSection/LatestUsersSection";

export interface CommentInterface {
  id: string;
  name: string;
  comment: string;
  date: string;
}

export interface MessageInterface {
  id: string;
  userId: string | null;
  username: string;
  email: string;
  message: string;
  date: string;
}
export default function DashboardHome() {
  function fetchPendingComments() {
    return apiClient.get("/comments");
  }

  function fetchLatestContactMessages() {
    return apiClient.get("/contact-messages", {
      params: {
        PageNumber: 1,
        PageSize: 15,
        SearchPhrase: ""
      }
    });
  }

  function fetchContactMessagesCount() {
    return apiClient.get("/contact-messages", {
      params: {
        PageNumber: 1,
        PageSize: 15,
        SearchPhrase: ""
      }
    });
  }

  function fetchPostsCount() {
    return apiClient.get("/posts", {
      params: {
        PageNumber: 1,
        PageSize: 15
      }
    });
  }
  
  const { data: pendingComments, isLoading: loadingComments, isError: isErrorPendingComments, error: pendingCommentsError } = useQuery({
    queryKey: ["pendingComments"],
    queryFn: fetchPendingComments,
  });

  const { data: latestContactMessages, isLoading: loadingMessages, isError: isErrorLatestContactMessages, error: latestContactMessagesError } = useQuery({
    queryKey: ["latestContactMessages"],
    queryFn: fetchLatestContactMessages,
  });

  const { data: contactMessagesData } = useQuery({
    queryKey: ["contactMessagesCount"],
    queryFn: fetchContactMessagesCount,
  });

  const { data: postsData } = useQuery({
    queryKey: ["postsCount"],
    queryFn: fetchPostsCount,
  });

  const postsCount = postsData?.data?.totalCount || 0;
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[#F3F6F8]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard count={postsCount} label="posts" bgColor="bg-teal-500" />
        <StatsCard count={contactMessagesData?.data?.totalCount || 0} label="Contact Messages" bgColor="bg-red-500" />
        <StatsCard count={0} label="Drafts" bgColor="bg-indigo-500" />
        <StatsCard count={0} label="Scheduled Posts" bgColor="bg-amber-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DataTableSection
          label="Pending Comments"
          description="Recently added unapproved comments"
          cols={["Id", "Name", "Comment", "Date"]}
          data={pendingComments?.data}
          isLoading={loadingComments}
          isError={isErrorPendingComments}
          error={pendingCommentsError?.message}
        />
        <DataTableSection
          label="Latest Contact Messages"
          description=" Recently added contact messages"
          cols={["Id", "Username", "Email", "Message", "Date"]}
          data={latestContactMessages?.data?.items?.slice(0, 5)}
          isLoading={loadingMessages}
          isError={isErrorLatestContactMessages}
          error={latestContactMessagesError?.message}
          viewAllPath="/admin/contact-messages"
        />
      </div>

      <LatestUsersSection />
    </div>
  );
}
