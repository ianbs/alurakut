import styled from "styled-components";
import { useEffect, useState } from "react";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBox } from "../src/components/ProfileRelations";
import {
	AlurakutMenu,
	AlurakutProfileSidebarMenuDefault,
	OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

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

export default function Home() {
	const githubUser = "ianbs";
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
	}, []);

	const handleCriaComunidade = (e) => {
		e.preventDefault();
		const dados = new FormData(e.target);
		// console.log(dados.get("title"));
		// console.log(dados.get("image"));
		const comunidade = {
			id: new Date(),
			comunidade: dados.get("comunidade"),
			// image: dados.get("image"),
		};
		setComunidades([...comunidades, comunidade]);
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
							{/* <div>
								<input
									placeholder="Coloque uma URL para usarmos de capa"
									name="image"
									aria-label="Coloque uma URL para usarmos de capa"
									type="text"
								/>
							</div> */}
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
