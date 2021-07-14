import styled from "styled-components";
import Box from "../Box";

export function ProfileRelationsBox({ relations, titulo }) {
	console.log(relations);
	return (
		<ProfileRelationsBox.Wrapper>
			<h2 className="smallTitle">
				{titulo} ({relations.length > 0 ? relations.length : 0})
			</h2>
			<ul>
				{relations.slice(0, 6).map((relations) => {
					return (
						<li key={relations.id}>
							<a
								href={
									relations.type === "User"
										? `/user/${relations.login}`
										: `/comunidade/${relations.comunidade}`
								}
							>
								<img
									src={
										relations.login
											? relations.avatar_url
											: `https://picsum.photos/150/150?${relations.id}`
									}
								/>
								<span>
									{relations.type === "User"
										? relations.login
										: relations.comunidade}
								</span>
							</a>
						</li>
					);
				})}
			</ul>
		</ProfileRelationsBox.Wrapper>
	);
}
ProfileRelationsBox.Wrapper = styled(Box)`
	ul {
		display: grid;
		grid-gap: 8px;
		grid-template-columns: 1fr 1fr 1fr;
		max-height: 220px;
		list-style: none;
	}
	img {
		object-fit: cover;
		background-position: center center;
		width: 100%;
		height: 100%;
		position: relative;
	}
	ul li a {
		display: inline-block;
		height: 102px;
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		span {
			color: #ffffff;
			font-size: 10px;
			position: absolute;
			left: 0;
			bottom: 10px;
			z-index: 2;
			padding: 0 4px;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 100%;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
		&:after {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: 1;
			background-image: linear-gradient(0deg, #00000073, transparent);
		}
	}
`;
