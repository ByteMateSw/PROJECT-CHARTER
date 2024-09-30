import { CheckedItems, SidebarEventsArgs } from "./interfaces";

export const useSidebarEvents = ({
  setCheckedItems,
  setSelectedProfessions,
  professions,
  setSearch,
}: SidebarEventsArgs) => {
  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevCheckedItems: CheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };

      updatedCheckedItems[id]
        ? delete updatedCheckedItems[id]
        : (updatedCheckedItems[id] = true);

      return updatedCheckedItems;
    });

    setSelectedProfessions((prevSelectedProfessions: string[]) => {
      const professionName = professions[id].name;

      if (prevSelectedProfessions.includes(professionName)) {
        return prevSelectedProfessions.filter(
          (profession) => profession !== professionName
        );
      }

      return prevSelectedProfessions.concat(professionName);
    });
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCheckedItems({});
  };

  return {
    handleCheckboxChange,
    handleSearchTermChange,
  };
};
