import { InvoiceJobNumberingFormHelperFunction } from "@/helpers/FormHelper";
import { useForm } from "react-hook-form";

const InvoiceNumberingForm = () => {
  const list = InvoiceJobNumberingFormHelperFunction();
  const { register } = useForm();

  return (
    <form className="grid md:grid-cols-12 grid-cols-1 gap-4 mt-4">
      {list.map((item, index) => {
        let colSpanClass = "";

        if (index === 0) colSpanClass = "md:col-span-4 col-span-1";
        else if (index === 1 || index === 2) colSpanClass = "col-span-4 ";
        else if (index === 3) colSpanClass = "col-span-12";
        else colSpanClass = "col-span-12";

        return (
          <div key={item.register} className={colSpanClass}>
            <label className="text-sm font-[Inter-Medium]">{item.label}</label>
            <input
              {...register(item.register)}
              placeholder={item.placeholder}
              type="number"
              className="text-sm outline-0 border border-border-grey/40 p-2 rounded-4 w-full mt-2 px-3"
            />
          </div>
        );
      })}
    </form>


  );
};

export default InvoiceNumberingForm;
