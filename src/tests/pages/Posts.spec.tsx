import { mocked } from "jest-mock";
import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "@/app/posts";
import { getPrismicClient } from "@/services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    except: "Post excerpt",
    updatedAt: "10 de Abril",
  },
];

jest.mock("../../services/prismic");

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [{ type: "paragraph", text: "Post Excerpt" }],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
    });

    const response = await getStaticProps;

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "Post excerpt",
              updatedAt: "01 de abril de 2021",
            },
          ],
        },
      })
    );
  });

  // it('loads initial data', async () => {
  //     const retriveStripePricesMocked = mocked(stripe.prices.retrieve)

  //     retriveStripePricesMocked.mockResolvedValueOnce({
  //         id: 'fake-price-id',
  //         unit_amount: 1000,
  //     } as any)

  //     const response = await getStaticProps ({})

  //     expect(response).toEqual(
  //         expect.objectContaining({
  //             props: {
  //                 product: {
  //                     priceId: 'fake-price-id',
  //                     amount: 'R$10.00'
  //                 }
  //             }
  //         })
  //     )
  // })
});
