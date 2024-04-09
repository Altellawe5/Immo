const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const PropertyController = {
    findAll: async (req, res) => {
        try {
            const properties = await prisma.property.findMany({
                select: {
                    id: true,
                    street: true,
                    houseNumber: true,
                    floor: true,
                    commune: true,
                    city: true,
                    postalCode: true,
                    price: true,
                    bedrooms: true,
                    bathrooms: true,
                    surface: true,
                    description: true,
                    isForSell: true,
                    isSoldRent: true,
                    availableAt: true,
                    createdAt: true,
                    constructionYear: true,
                    typeProperty: {
                        select: {
                            name: true
                        }
                    },
                    images: {
                        select: {
                            id: true,
                            url: true
                        }
                    },
                    propertyRegion: {
                        select: {
                            region: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                },
                orderBy: [{ id: "desc" }]
            })
            res.status(200).json(properties)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    findById: async (req, res) => {
        try {
            const id = req.params.id
            const property = await prisma.property.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    street: true,
                    houseNumber: true,
                    floor: true,
                    commune: true,
                    city: true,
                    postalCode: true,
                    price: true,
                    bedrooms: true,
                    bathrooms: true,
                    surface: true,
                    description: true,
                    isForSell: true,
                    isSoldRent: true,
                    buildingCondition: true,
                    availableAt: true,
                    createdAt: true,
                    constructionYear: true,
                    typeProperty: {
                        select: {
                            name: true
                        }
                    },
                    images: {
                        select: {
                            id: true,
                            url: true
                        }
                    },
                    propertyRegion: {
                        select: {
                            region: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            })
            if (!property) {
                return res.status(400).json({ message: "Property does not exist" })
            }
            res.status(200).json(property)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    create: async (req, res) => {
        try {
            const { street, houseNumber, floor, commune, city, postalCode, price, bedrooms, bathrooms, surface, description, buildingCondition, isForSell, isSoldRent, availableAt, constructionYear, typePropertyId, images, regionIds } = req.body
            const property = await prisma.property.create({
                data: {
                    street: street,
                    houseNumber: houseNumber,
                    floor: floor,
                    commune: commune,
                    city: city,
                    postalCode: postalCode,
                    price: price,
                    bedrooms: bedrooms,
                    bathrooms: bathrooms,
                    surface: surface,
                    description: description,
                    buildingCondition: buildingCondition,
                    isForSell: isForSell,
                    isSoldRent: isSoldRent,
                    availableAt: availableAt,
                    constructionYear: constructionYear,
                    typePropertyId,
                    propertyRegion: {
                        create: regionIds.map(regionId => ({ regionId })),
                    },
                    images: {
                        connect: images
                    }
                }
            })
            res.status(201).json({ message: "sucessfully created", property })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { street, houseNumber, floor, postalCode, commune, city, price, beds, baths, sqft, description, buildingCondition, availableAt, constructionYear, typePropertyId, isForSale, isSoldRent, regionIds } = req.body

            const currentProperty = await prisma.property.findUnique({
                where: {
                    id: id
                },
                include: {
                    propertyRegion: true
                }
            });

            await Promise.all(currentProperty.propertyRegion.map(async propertyRegion => {
                await prisma.propertyRegion.delete({
                    where: {
                        propertyId_regionId: {
                            propertyId: propertyRegion.propertyId,
                            regionId: propertyRegion.regionId
                        }
                    }
                });
            }));

            const property = await prisma.property.update({
                where: {
                    id: Number(id)
                },
                data: {
                    street: street,
                    houseNumber: houseNumber,
                    floor: floor,
                    postalCode: postalCode,
                    commune: commune,
                    city: city,
                    price: price,
                    bedrooms: beds,
                    bathrooms: baths,
                    surface: sqft,
                    description: description,
                    buildingCondition: buildingCondition,
                    isForSale: isForSale,
                    isSoldRent: isSoldRent,
                    availableAt: availableAt,
                    constructionYear: constructionYear,
                    typePropertyId: typePropertyId,
                    propertyRegion: {
                        create: regionIds.map(regionId => ({ regionId })),
                    }
                }
            })
            if (!property) {
                return res.status(400).json({ message: "Property does not exist" })
            }
            res.status(200).json({ message: "successfully updated", property })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            await prisma.propertyRegion.deleteMany({
                where: {
                    propertyId: Number(id)
                }
            })
            const property = await prisma.property.delete({
                where: {
                    id: Number(id)
                }
            })
            if (!property) {
                return res.status(400).json({ message: "Property does not exist" })
            }
            res.json({ message: "Property deleted" })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    searchProperty: async (req, res) => {
        try {
            const { region, isForSell, postalCode } = req.body
            let searchConditions = []
            let orderByConditions = [];

            // search
            if (region) {
                const foundRegion = await prisma.region.findFirst({
                    where: {
                        name: {
                            equals: region.toLowerCase()

                        }
                    }
                });
                if (foundRegion) {
                    searchConditions.push({
                        propertyRegion: {
                            some: {
                                regionId: foundRegion.id
                            }
                        }
                    });
                }
                else {
                    searchConditions.push({
                        propertyRegion: {
                            some: {
                                regionId: -1
                            }
                        }
                    });
                }
                //console.log(region)
                //console.log(foundRegion)
                console.log(searchConditions)
            }
            if (isForSell !== undefined) {
                //const isForSellBool = String(isForSell).toLowerCase() === "true";
                searchConditions.push({ isForSell: { equals: isForSell } })
            }
            //console.log(searchConditions)
            if (postalCode) {
                searchConditions.push({ postalCode: { equals: postalCode } })
            }


            const results = await prisma.property.findMany({
                where: {
                    AND: [...searchConditions]
                },
                include: {
                    propertyRegion: true,
                    images: true
                },
                orderBy: orderByConditions
            })
            res.status(200).json(results)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    filterProperty: async (req, res) => {
        try {
            const { priceMin, priceMax, bedrooms, surface } = req.body
            let filterConditions = [];
            let orderByConditions = [];
            if (priceMin && priceMax) {
                filterConditions.push({ price: { gte: parseInt(priceMin), lte: parseInt(priceMax) } });
                orderByConditions.push({ price: 'asc' })
            }
            if (bedrooms) {
                filterConditions.push({ bedrooms: { gte: bedrooms } });
                orderByConditions.push({ bedrooms: 'asc' })
            }
            if (surface) {
                filterConditions.push({ surface: { gte: surface } });
                orderByConditions.push({ surface: 'asc' })
            }
            console.log(filterConditions)
            console.log(bedrooms)
            const results = await prisma.property.findMany({
                where: {
                    AND: [...filterConditions]
                },
                include: {
                    propertyRegion: true,
                    images: true
                },
                orderBy: orderByConditions
            })
            res.status(200).json(results)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    },
    getPropertyTypes: async (req, res) => {
        try {
            const propertyTypes = await prisma.typeProperty.findMany()
            res.status(200).json(propertyTypes)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getRegions: async (req, res) => {
        try {
            const regions = await prisma.region.findMany()
            res.status(200).json(regions)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    // uploadImage: async (req, res, next) => {
    //     try {
    //         const image = await prisma.image.create({
    //             data: {
    //                 url: req.file.path
    //             }
    //         })
    //         res.status(201).json({ message: "successfully uploaded", image })
    //     }
    //     catch (error) {
    //         res.status(500).json({ message: error.message })
    //     }
    // }
}
module.exports = PropertyController