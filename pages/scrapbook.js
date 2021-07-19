import MainGrid from "../src/components/MainGrid";
import ProfileSideBar from "../src/components/ProfileSideBar";
import { AlurakutMenu } from "../src/lib/AlurakutCommons";
import styled, { css } from "styled-components";

import nookies from "nookies";
import jwt from "jsonwebtoken";
import Box from "../src/components/Box";
import { useEffect, useState } from "react";

function convertData(data) {
  return new Date(data).toLocaleString();
}

export default function Scrapbook(props) {
  const [scraps, setScraps] = useState([]);

  useEffect(() => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "31f64b360dcd20180845a2634d0dba",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
            allScraps(filter: {ownerSlug: {eq: ${props.githubUser}}}, orderBy: createdAt_DESC){
              id,
              message,
              _createdAt
              ownerSlug
              creatorSlug
            }
          }`,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setScraps(data.data.allScraps);
      });
  }, []);

  const handleScrap = (e) => {
    e.preventDefault();
    const dados = new FormData(e.target);
    const scrap = {
      creatorSlug: props.githubUser,
      message: dados.get("scrap"),
      ownerSlug: props.githubUser,
    };

    fetch("/api/scraps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scrap),
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      setScraps([...scraps, data.registro]);
    });
  };

  return (
    <>
      <AlurakutMenu githubUser={props.githubUser} />
      <MainGrid>
        <div className="profile" style={{ gridArea: "profile" }}>
          <ProfileSideBar githubUser={props.githubUser} />
        </div>
        <div className="welcome" style={{ gridArea: "welcome" }}>
          <Scrapbook.Wrapper>
            <h1 className="title">Scrapbook</h1>
            <div>
              <form className="form-scrap" onSubmit={handleScrap}>
                <div>
                  <textarea
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    name="scrap"
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    type="textarea"
                  ></textarea>
                </div>
                <button>Publicar messagem</button>
              </form>
            </div>
            {scraps.length > 0
              ? scraps.map((scrap) => {
                  return (
                    <div className="scrap" key={scrap.id}>
                      <img
                        src={`https://github.com/${scrap.creatorSlug}.png`}
                      />
                      <div>
                        {scrap.creatorSlug} <br />
                        <br />
                        {scrap.message}
                        <br />
                        <br />
                        {convertData(Date.parse(scrap._createdAt))}
                      </div>
                    </div>
                  );
                })
              : 0}
          </Scrapbook.Wrapper>
        </div>
      </MainGrid>
    </>
  );
}

Scrapbook.Wrapper = styled(Box)`
  width: 939px;
  /* height: 1015px; */
  height: 100%;
  padding: 20px;
  .form-scrap {
    margin: 20px;
    textarea {
      width: 100%;
      background-color: #f4f4f4;
      color: #333333;
      border: 0;
      padding: 14px 16px;
      margin-bottom: 14px;
      border-radius: 10000px;
      ::placeholder {
        color: #333333;
        opacity: 1;
      }
    }
  }

  .scrap {
    display: flex;
    width: 100%;
    border-radius: 8px;
    height: 124px;
    background-color: #d9e6f6;
    padding: 20px;
    img {
      border-radius: 8px;
      margin-right: 10px;
    }
    & :nth-child(odd) {
      background-color: #f1f9fe;
    }
  }
`;

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
