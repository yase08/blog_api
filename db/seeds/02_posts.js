/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(() => {
      return knex("posts").insert([
        {
          id: 1,
          title: "post 1",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, nobis.",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati optio corporis dolorem rem eos accusamus officiis tenetur laboriosam, delectus saepe deserunt reprehenderit provident facere quae harum temporibus consequatur consequuntur sint molestiae praesentium iusto blanditiis culpa asperiores? Beatae earum, totam eaque architecto vitae corrupti aliquam dolores tempore itaque autem quae labore ea ratione ex voluptates repudiandae consectetur, cum animi, corporis nostrum! Repellendus, deserunt voluptate molestiae est dolor animi eveniet earum eum delectus corrupti alias aspernatur eligendi vero rerum possimus. Error ipsum neque rerum doloribus nisi possimus quos consequuntur molestiae ipsa tempora ratione itaque atque et mollitia sed, ducimus accusamus non illum accusantium. Distinctio officiis sit laudantium cum ducimus deleniti odio itaque et, reprehenderit necessitatibus incidunt? In incidunt, enim porro ratione delectus sint perspiciatis ab animi harum doloribus eius minima omnis! Sunt vitae esse amet excepturi culpa ullam, enim, totam repudiandae cum autem numquam perspiciatis rerum repellendus! Earum porro et quibusdam vitae nam officia, corrupti soluta? Totam incidunt praesentium amet doloribus ipsum accusamus nulla corporis repellat fuga repellendus nisi labore quibusdam non, voluptas id aliquid aut maxime laboriosam blanditiis expedita veniam quos! Facilis ducimus nam tempora mollitia nostrum, deleniti nisi officia officiis illo asperiores harum, delectus beatae commodi dolore ullam voluptates alias?",
          slug: "Lorem ipsum dolor sit amet.",
          thumbnail: "image.png",
          user_id: 1,
          tag_id: 1,
        },
      ]);
    });
};