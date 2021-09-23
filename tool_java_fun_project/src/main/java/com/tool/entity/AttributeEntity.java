package com.tool.entity;

import org.apache.commons.lang3.StringUtils;

public class AttributeEntity {
    private String key;
    private String value;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public AttributeEntity() {
    }

    public AttributeEntity(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public AttributeEntity(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        final StringBuilder stringBuilder = new StringBuilder() ;
        if (StringUtils.isNotBlank(getKey()) && StringUtils.isNotBlank(getValue())) {
            stringBuilder.append(getKey()).append("=").append("\"").append(getValue()).append("\"");
        }else {
//            stringBuilder.append(" ").append(getKey()).append(" ");
            stringBuilder.append(" ").append(getKey()).append("");
        }
        return stringBuilder.toString();
    }
}
