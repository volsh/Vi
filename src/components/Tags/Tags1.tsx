import ChipsArray, { ChipData } from "../common/Chips/Chips";

type TagsProps = {
  value?: number[];
  onChange?: (value: Array<number>) => void;
};

export default function Tags({ value = [], onChange }: TagsProps) {
  //   const handleAddTag = (chip: ChipData) => {
  //   setTask((prev) => {
  //     return {
  //       ...prev,
  //       tags: prev.tags ? [...prev.tags, chip as Tag] : [chip as Tag],
  //     };
  //   });
  // }

  const handleDeleteTag = (chip: ChipData) => {
    onChange && onChange(value.filter((tagId) => tagId !== chip.id));
  };

  return (
    <ChipsArray
    //   chips={}
      labelField="name"
      onDeleteChip={handleDeleteTag}
      //   onAddChip={handleAddTag}
    />
  );
}
