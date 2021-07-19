import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import Box from "../Box";

export default function ProfileSideBar(props) {
  return (
    <Box as="aside">
      {console.log(props)}
      <img
        style={{ borderRadius: "8px" }}
        src={`https://github.com/${props.githubUser}.png`}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}
