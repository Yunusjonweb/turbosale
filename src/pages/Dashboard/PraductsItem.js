import React from "react";
import { Card } from "antd";
import { PraductsContainer } from "../../styles/components/PraductsItemStyles";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const { Meta } = Card;

export default function PraductsItem({ data }) {
  return (
    <PraductsContainer>
      <div className="praducts_card">
        {data.length
          ? data.map((item) => (
              <Card
                key={item.id}
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={item.imge} />}
                actions={[
                  <h3>{item.price ? item.price + "$" : null}</h3>,
                  <h3>
                    <del>{item.axia ? item.axia + "$" : null}</del>
                  </h3>,
                  <MinusOutlined />,
                  <PlusOutlined />,
                ]}
              >
                <Meta title={item.title} />
              </Card>
            ))
          : null}
      </div>
    </PraductsContainer>
  );
}
