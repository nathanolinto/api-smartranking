interface IPopulate {
  ids: string[];
  service: any;
  findById: string;
}

export const populate = async (params: IPopulate) => {
  const { ids, service, findById } = params;
  const items = [];
  if (ids) {
    for (const id of ids) {
      items.push(await service[findById](id));
    }
  }
  return items;
};
