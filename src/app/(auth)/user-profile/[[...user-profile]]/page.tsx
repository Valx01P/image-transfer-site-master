import { UserProfile } from "@clerk/nextjs";
 
const UserProfilePage = () => (
    <div className="flex items-center justify-center flex-col gap-10">
    <h1 className="text-4xl font-bold mt-20">This is the profile page</h1>
    <UserProfile path="/user-profile" routing="path" />
    </div>
);
 
export default UserProfilePage;
