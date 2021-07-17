import styled from "styled-components";
import { useEffect, useState } from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBox } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import router from "next/router";

function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: "8px" }}
        src={`https://github.com/${propriedades.githubUser}.png`}
      />
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [peoples, setPeoples] = useState([]);
  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/ianbs/followers")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setPeoples(data);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "31f64b360dcd20180845a2634d0dba",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
			allCommunities {
			  id
			  title
			  imageUrl
			  creatorSlug
		  }
		  }`,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setComunidades(data.data.allCommunities);
      });
  }, []);

  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const dados = new FormData(e.target);
    // console.log(dados.get("title"));
    // console.log(dados.get("image"));
    const comunidade = {
      title: dados.get("comunidade"),
      imageUrl: dados.get("image"),
      creatorSlug: githubUser,
    };

    fetch("/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comunidade),
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      setComunidades([...comunidades, data.registro]);
    });

    //
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profile" style={{ gridArea: "profile" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcome" style={{ gridArea: "welcome" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet confiavel={3} legal={2} sexy={1} />
            {/*Passando PROPS para o component para definir a quantidade*/}
          </Box>
          <Box>
            <h3 className="subTitle">O que voce deseja fazer?</h3>
            <form onSubmit={handleCriaComunidade}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="comunidade"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="relations" style={{ gridArea: "relations" }}>
          {/* <ProfileRelationsBoxWrapper>
						<h2 className="smallTitle">
							Amigos ({peoples.length > 0 ? peoples.length : 0})
						</h2>
						<ul>
							{peoples.map((pessoa) => {
								return (
									<li key={pessoa.id}>
										<a href={`/users/${pessoa.login}`}>
											<img src={`https://github.com/${pessoa.login}.png`} />
											<span>{pessoa.login}</span>
										</a>
									</li>
								);
							})}
						</ul>
					</ProfileRelationsBoxWrapper> */}
          <ProfileRelationsBox
            relations={peoples}
            titulo={"Amigos(as)"}
          ></ProfileRelationsBox>
          <ProfileRelationsBox
            relations={comunidades}
            titulo={"Comunidades"}
          ></ProfileRelationsBox>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resp) => resp.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    },
  };
}
