import styled from "styled-components";
import { useEffect, useState } from "react";

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
	const [peoples, setPeoples] = useState([]);

	useEffect(() => {
		fetch("https://api.github.com/users/ianbs/followers")
			.then((results) => {
				return results.json();
			})
			.then((data) => {
				setPeoples(data);
			});
	}, []);

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
						<h2 className="smallTitle">
							Amigos ({peoples.length > 0 ? peoples.length : 0})
						</h2>
						<ul>
							{peoples.map((pessoa) => {
								return (
									<li>
										<a href={`/users/${pessoa.login}`} key={pessoa.login}>
											<img src={`https://github.com/${pessoa.login}.png`} />
											<span>{pessoa.login}</span>
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
