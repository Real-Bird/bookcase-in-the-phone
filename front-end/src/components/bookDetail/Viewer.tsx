import styled from "styled-components";

const DetailBlock = styled.div`
  width: 100%;
  height: 88vh;
  background: rgba(223, 249, 251, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 3rem;
  padding: 1rem 10px;
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

export function DetailViewer() {
  return (
    <>
      <DetailBlock>
        <DetailTop>
          <CoverImage src="https://picsum.photos/200/300" />
          <BookInfoBox>
            <div className="info">제목</div>
            <div className="info">지은이</div>
            <div className="info">옮긴이</div>
            <div className="info">출판사</div>
            <div className="info">ISBN</div>
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
            {true ? (
              <div id="review">
                Nam augue mauris, egestas id lorem quis, viverra bibendum odio.
                Sed sed eleifend mi, at porttitor sapien. Maecenas eleifend
                libero in erat varius, at dignissim est posuere. Sed massa nisi,
                molestie sit amet libero et, pulvinar lobortis felis. Maecenas
                tempus felis nec nisi faucibus facilisis sed vitae odio.
              </div>
            ) : (
              <textarea
                id="review"
                value={`Nam augue mauris, egestas id lorem quis, viverra bibendum odio.
                Sed sed eleifend mi, at porttitor sapien. Maecenas eleifend
                libero in erat varius, at dignissim est posuere. Sed massa nisi,
                molestie sit amet libero et, pulvinar lobortis felis. Maecenas
                tempus felis nec nisi faucibus facilisis sed vitae odio.`}
              ></textarea>
            )}
          </div>
        </DetailBottom>
      </DetailBlock>
    </>
  );
}
