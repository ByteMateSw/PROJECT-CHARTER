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

    setSelectedProfessions((prevSelectedProfessions: string[]): string[] => {
      // const professionName = professions[id].name;
      const professionName = professions.find(obj => obj.id === id);

      if (professionName != undefined) {
        if (prevSelectedProfessions.includes(professionName.name)) {
          return prevSelectedProfessions.filter(
            (profession) => profession !== professionName.name
          );
        }
        return prevSelectedProfessions.concat(professionName.name);
      }
      return prevSelectedProfessions
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
