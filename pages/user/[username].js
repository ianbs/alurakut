import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import { ProfileRelationsBox } from "../../src/components/ProfileRelations";
import ProfileSideBar from "../../src/components/ProfileSideBar";
import {
	AlurakutMenu,
	OrkutNostalgicIconSet,
} from "../../src/lib/AlurakutCommons";

export default function UserPage() {
	const router = useRouter();
	const { username } = router.query;

	const [peoples, setPeoples] = useState([]);
	const [comunidades, setComunidades] = useState([]);

	useEffect(() => {
		// console.log(username);
		fetch(`https://api.github.com/users/${username}/followers`)
			.then((results) => {
				return results.json();
			})
			.then((data) => {
				console.log(data);
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
			allCommunities(filter: {creatorSlug: {eq: ${username}}}) {
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
				console.log(data.data);
				setComunidades(data.data.allCommunities);
			});
	}, [username]);

	return (
		<>
			<AlurakutMenu githubUser={username} />
			<MainGrid>
				<div className="profile" style={{ gridArea: "profile" }}>
					<ProfileSideBar githubUser={username} />
				</div>
				<div className="welcome" style={{ gridArea: "welcome" }}>
					<Box>
						<h3 className="title">@{username}</h3>
						<OrkutNostalgicIconSet confiavel={3} legal={2} sexy={1} />
						{/*Passando PROPS para o component para definir a quantidade*/}
					</Box>
					{/* <Box>
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
					</Box> */}
				</div>
				<div className="relations" style={{ gridArea: "relations" }}>
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
