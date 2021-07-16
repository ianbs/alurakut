import { SiteClient } from "datocms-client";

export default async function requestReciver(request, response) {
  if (request.method === "POST") {
    const TOKEN = "ce41c86e48484bf50d6eed2fe5e905";
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: "972667",
      ...request.body,
      //   title: "Meu passado é negro...",
      //   imageUrl:
      //     "https://img10.orkut.br.com/community/17934937835e6da17173b345.40629413_92c59e66400cc5adfa246fc1173d68f1.jpg",
      //   creatorSlug: "ianbs",
    });
    response.json({ registro: record });
    return;
  }
}
