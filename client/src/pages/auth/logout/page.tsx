import { Button } from "../../../components/ui/button";
import { useAtom } from "jotai";
import { userID } from "../../../components/atoms/userID";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [user, setUser] = useAtom(userID);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center h-[90vh]">
        <Button
          variant="outline"
          className="bg-[#052f4a] text-white w-2xs"
          onClick={() => {
            setUser(null);
            navigate("/");
          }}>
          Logout
        </Button>
      </div>
    </>
  );
}
