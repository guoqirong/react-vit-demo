import { FunctionComponent } from "react";
import Generator from "fr-generator";
import FormRender, { useForm } from "form-render";
import { Button } from "antd";

interface DemoPageProps {
  
}
 
const DemoPage: FunctionComponent<DemoPageProps> = () => {
  const defaultValue = {
    type: "object",
    properties: {
      inputName: {
        title: "简单输入框",
        type: "string",
      },
    },
  };

  const schema = {
    type: "object",
    labelWidth: 130,
    displayType: "row",
    properties: {
      inputName: {
        title: "简单输入框",
        type: "string",
      },
      multiSelect_uiV57i: {
        title: "多选",
        description: "下拉多选",
        type: "array",
        items: {
          type: "string",
        },
        enum: ["0", "1", "2", "3"],
        enumNames: ["杭州", "武汉", "湖州", "贵阳"],
        widget: "multiSelect",
        default: "['杭州', '武汉']",
      },
    },
  };
  const form = useForm();

  const onFinish = (formData: any) => {
    console.log("formData:", formData);
  };

  return (
    <>
      <div style={{ width: "100vw" }}>
        <Generator defaultValue={defaultValue} />
      </div>
      <>
        <FormRender
          form={form}
          schema={schema}
          onFinish={onFinish}
        />
        <Button type="primary" onClick={form.submit}>
          提交
        </Button>
      </>
    </>
  );
}
 
export default DemoPage;