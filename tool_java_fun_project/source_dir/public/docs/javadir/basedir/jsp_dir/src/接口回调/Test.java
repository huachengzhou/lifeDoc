package �ӿڻص�;

public class Test {
	public static void main(String[] args) {
		//�½�һ��Ĭ�������
		Out b=new Out();
		b.printlen("���ﲻ�ᱻ����������¼�");		
		//�½�һ�������,Ϊ��������һ����������¼�
		Out b1=new Out(new PrintListenerDemo());
		b1.printlen("���������ᱻ����������¼�");
	}
}
