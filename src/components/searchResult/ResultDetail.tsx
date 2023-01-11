import { useIsbnDispatch, useIsbnState } from "@/libs/searchContextApi";
import { DetailBlock } from "@components/bookDetail/Viewer";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 0 20px;
  justify-items: center;
  margin-bottom: 10px;
  button {
    background: rgba(223, 249, 251, 0.9);
    width: 50%;
    border-radius: 100px;
    box-shadow: rgba(223, 249, 251, 0.2) 0 -25px 18px -14px inset,
      rgba(223, 249, 251, 0.15) 0 1px 2px, rgba(223, 249, 251, 0.15) 0 2px 4px,
      rgba(223, 249, 251, 0.15) 0 4px 8px, rgba(223, 249, 251, 0.15) 0 8px 16px,
      rgba(223, 249, 251, 0.15) 0 16px 32px;
    color: green;
    cursor: pointer;
    display: inline-block;
    font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto,
      sans-serif;
    padding: 7px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 250ms;
    border: 0;
    font-size: 16px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  button:hover {
    box-shadow: rgba(223, 249, 251, 0.35) 0 -25px 18px -14px inset,
      rgba(223, 249, 251, 0.25) 0 1px 2px, rgba(223, 249, 251, 0.25) 0 2px 4px,
      rgba(223, 249, 251, 0.25) 0 4px 8px, rgba(223, 249, 251, 0.25) 0 8px 16px,
      rgba(223, 249, 251, 0.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }
`;

const ResultBlock = styled(DetailBlock)`
  height: 83vh;
  padding: 1rem 1.75rem;
  max-width: 1024px;
  margin: 0 auto;
`;

const DetailTop = styled.div`
  width: 100%;
  max-height: 40%;
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
`;

const CoverImage = styled.img`
  width: 50%;
  border-radius: 5px;
  background: tan;
`;

const BookInfoBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > .info {
    padding: 3px 5px;
    font-size: 1.25rem;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  }
`;

const DetailBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > .description {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    height: 15rem;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
  }

  & > .review {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    height: 8rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px;
    & > label {
      font-size: 1.125rem;
      border-bottom: 1px solid black;
    }
    & > #review {
      height: 100%;
      overflow-y: scroll;
    }
  }
`;

export function ResultDetail() {
  const navigate = useNavigate();
  const isbnState = useIsbnState();
  const isbnDispatch = useIsbnDispatch();
  const onBack = () => {
    isbnDispatch({ type: "INITIALIZE_DATA" });
    navigate("/search");
  };
  return (
    <>
      <ButtonBlock>
        <button onClick={onBack} className="retry">
          재검색
        </button>
        <button className="save">저장하기</button>
      </ButtonBlock>
      <ResultBlock>
        <DetailTop>
          <CoverImage src={isbnState.TITLE_URL} />
          <BookInfoBox>
            <input className="info" value={isbnState.TITLE} />
            <input className="info" value={isbnState.AUTHOR} />
            <input className="info" value={isbnState.PUBLISHER} />
            <input className="info" value={isbnState.PUBLISH_PREDATE} />
            <input className="info" value={isbnState.EA_ISBN} />
          </BookInfoBox>
        </DetailTop>
        <DetailBottom>
          <div className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed
            ultricies orci. Aenean cursus orci et lorem suscipit luctus. Mauris
            vel fermentum leo, iaculis laoreet dui. Etiam sed orci vestibulum,
            commodo arcu non, dapibus ante. Integer augue eros, varius a tortor
            nec, convallis venenatis eros. Sed tristique rutrum luctus.
            Suspendisse potenti. Praesent eu sapien a velit fringilla dignissim.
            Aenean ut turpis felis. Fusce vulputate facilisis viverra. Etiam
            consequat lacus nec ipsum iaculis, maximus elementum urna molestie.
            Curabitur porttitor libero non metus posuere, sed finibus lorem
            venenatis. Quisque at nulla nec arcu bibendum faucibus non eget
            enim. Vivamus dictum nisl in urna malesuada luctus. Praesent
            facilisis ullamcorper tristique. Quisque ut scelerisque tortor, at
            tristique tellus. Nulla facilisi. Morbi ornare egestas tempor. Nunc
            vitae neque nibh. Nulla vitae orci tempus, hendrerit mi at, blandit
            arcu. Pellentesque aliquet urna et nulla aliquam egestas.
            Suspendisse commodo cursus interdum. Fusce id risus fringilla,
            tempus ligula sit amet, fringilla dolor. Donec vel convallis elit.
            Quisque sollicitudin ex vestibulum tempus feugiat. Nulla metus
            velit, pulvinar ac odio id, molestie porta diam. Suspendisse sit
            amet nibh nulla. Nam leo magna, euismod ut egestas et, dictum id
            nisi. Phasellus imperdiet vehicula odio vel maximus. Proin vitae
            scelerisque orci. Ut mollis vulputate consectetur.
          </div>
          <div className="review">
            <label htmlFor="review">감상평</label>
            <textarea
              id="review"
              value={`Nam augue mauris, egestas id lorem quis, viverra bibendum odio.
                Sed sed eleifend mi, at porttitor sapien. Maecenas eleifend
                libero in erat varius, at dignissim est posuere. Sed massa nisi,
                molestie sit amet libero et, pulvinar lobortis felis. Maecenas
                tempus felis nec nisi faucibus facilisis sed vitae odio.`}
            ></textarea>
          </div>
        </DetailBottom>
      </ResultBlock>
    </>
  );
}
