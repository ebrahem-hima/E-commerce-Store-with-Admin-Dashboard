import CategoryClientComponent from "./CategoryClientComponent";

interface Props {
  titleComponent: string | undefined;
  categories: { name: string; id: number }[] | undefined;
}
const CategoryComponent = ({ titleComponent, categories }: Props) => {
  return (
    <CategoryClientComponent
      titleComponent={titleComponent}
      categories={categories}
    />
  );
};

export default CategoryComponent;
