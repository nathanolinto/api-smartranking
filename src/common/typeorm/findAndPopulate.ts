interface ILookups {
  from: string;
  localField: string;
  as?: string;
  isSingle?: boolean;
}

interface IFindAndPopulate {
  repository: any;
  where?: any;
  lookups: ILookups[];
}

export const findPopulate = async (
  params: IFindAndPopulate,
): Promise<any[]> => {
  const match = {
    $match: {
      ...params.where,
    },
  };

  const lookups = params.lookups.map((lookup) => {
    return {
      $lookup: {
        from: lookup.from,
        localField: lookup.localField,
        foreignField: '_id',
        as: lookup.as || lookup.localField,
      },
    };
  });

  const replaceRoot = params.lookups
    .filter((lookup) => lookup.isSingle === true)
    .map((lookup) => lookup.as || lookup.localField);

  const elements = replaceRoot && {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          '$$ROOT',
          ...replaceRoot.map((element) => {
            return {
              [element]: {
                $arrayElemAt: [`$${element}`, 0],
              },
            };
          }),
        ],
      },
    },
  };
  const query = [];
  query.push(match);
  query.push(...lookups);
  if (elements) {
    query.push(elements);
  }
  return await params.repository.aggregate(query).toArray();
};
