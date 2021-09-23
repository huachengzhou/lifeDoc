package com.tool.entity;

import java.util.ArrayList;
import java.util.List;

public class LabelEntity {
    private String ele;

    private String casing = "<" ;

    private List<AttributeEntity> attributeEntities = new ArrayList<>(1);

    public String getEle() {
        return ele;
    }

    public LabelEntity setEle(String ele) {
        this.ele = ele;
        return this;
    }

    public List<AttributeEntity> getAttributeEntities() {
        return attributeEntities;
    }

    public LabelEntity setAttributeEntities(List<AttributeEntity> attributeEntities) {
        this.attributeEntities = attributeEntities;
        return this;
    }

    public String getCasing() {
        return String.format("%s%s",casing,getEle());
    }

    public void setCasing(String casing) {
        this.casing = casing;
    }
}
