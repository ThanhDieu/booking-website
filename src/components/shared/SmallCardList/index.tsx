import View from "./View";

export interface SmallCard {
  href: string,
  imageUrl: string,
  title: string,
  active?: boolean
}

export interface SmallCardListModel {
  cards: SmallCard[]
}

interface SmallCardListProps {
  data: SmallCardListModel;
}

const SmallCardList = (props: SmallCardListProps) => {
  return <View model={props.data} />
};

export default SmallCardList;
