import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { getProfessions } from "@/app/api/office";
import { getProvinces } from "@/app/api/locations";
import { CheckedItems, Profession, SidebarEffectsArgs } from "./interfaces";
import { Province, City, Locations } from "./interfaces";

export const useSidebarEffects = ({
  setLocations,
  selectedProfessions,
  setSelectedProfessions,
  professions,
  setProfessions,
  setCheckedItems,
}: SidebarEffectsArgs) => {
  const router = useRouter();
  const searchParams: URLSearchParams = useSearchParams();
  const professionsParams: string | null = searchParams.get("professions");
  const path = usePathname();
  
  
  useEffect(() => {
    getProvinces().then((newProvinces: Province[]) => {
      setLocations((prevState: Locations) => ({
        ...prevState,
        provinces: newProvinces,
      }));
    });
    // getCities().then((newCities: City[]) => {
    //   setLocations((prevState: Locations) => ({
    //     ...prevState,
    //     cities: newCities,
    //   }));
    // });
  }, []);

  useEffect(() => {
    if (professionsParams) setSelectedProfessions(professionsParams.split("-"));
  }, [professionsParams]);

  useEffect(() => {
    if (selectedProfessions.length === 0 && path === "/dashboard/hire") router.replace("/dashboard/hire");
    else router.push(`?professions=${selectedProfessions.join("-")}`);
  }, [selectedProfessions, router]);

  useEffect(() => {
    const newCheckedItems: CheckedItems = selectedProfessions.reduce(
      (acc: CheckedItems, curr: string) => {
        const index: number = professions.findIndex(
          (profession: Profession) => profession.name === curr
        );
        return { ...acc, [index]: true };
      },
      {}
    );
    setCheckedItems(newCheckedItems);
  }, [selectedProfessions]);

  useEffect(() => {
    getProfessions()
      .then((data: Profession[]) => {
        setProfessions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
};
