import styled from "styled-components";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

function ProfileSideBar(propriedades) {
  return (
    <Box className="profile" style={{ gridArea: "profile" }}>
      <img
        style={{ borderRadius: "8px" }}
        src={`https://github.com/${propriedades.githubUser}.png`}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "ianbs";
  const pessoas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "gabsprates",
    "marcobrunodev",
    "filipefialho",
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <ProfileSideBar githubUser={githubUser} />
        <Box className="welcome" style={{ gridArea: "welcome" }}>
          <h1 className="title">Bem vindo(a)</h1>
          <OrkutNostalgicIconSet />
        </Box>
        <div className="relations" style={{ gridArea: "relations" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Amigos ({pessoas.length})</h2>
            <ul>
              {pessoas.map((pessoa) => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
