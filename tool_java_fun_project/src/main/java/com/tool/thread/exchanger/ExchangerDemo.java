package com.tool.thread.exchanger;

import java.util.concurrent.Exchanger;

public class ExchangerDemo {

    public static void main(String[] args) {
        Exchanger<String> stringExchanger = new Exchanger<>();
        ThreadA threadA = new ThreadA(stringExchanger, "线程A");
        ThreadB threadB = new ThreadB(stringExchanger, "线程B");
        threadA.start();
        threadB.start();
    }

    public static class ThreadA extends Thread {
        private Exchanger<String> stringExchanger;

        @Override
        public void run() {
            try {
                System.out.println("当前线程" + getName() + "获取到" + stringExchanger.exchange("a"));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        public Exchanger<String> getStringExchanger() {
            return stringExchanger;
        }

        public void setStringExchanger(Exchanger<String> stringExchanger) {
            this.stringExchanger = stringExchanger;
        }

        public ThreadA(Exchanger<String> stringExchanger, String name) {
            this.stringExchanger = stringExchanger;
            this.setName(name);
        }
    }

    public static class ThreadB extends Thread {
        private Exchanger<String> stringExchanger;

        @Override
        public void run() {
            try {
                System.out.println("当前线程" + getName() + "获取到" + stringExchanger.exchange("b"));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        public Exchanger<String> getStringExchanger() {
            return stringExchanger;
        }

        public void setStringExchanger(Exchanger<String> stringExchanger) {
            this.stringExchanger = stringExchanger;
        }

        public ThreadB(Exchanger<String> stringExchanger, String name) {
            this.stringExchanger = stringExchanger;
            this.setName(name);
        }
    }
}
