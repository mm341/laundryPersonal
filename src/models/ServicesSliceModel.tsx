import { HomeAreas } from "@/interfaces/HomeAreas";
import { HomeServices } from "@/interfaces/HomeServices";
import { Banners } from "@/interfaces/ServiceBanners";

export type ServicesModel={
    services: HomeServices[],
    areas: HomeAreas[],
    banners:Banners[],
}