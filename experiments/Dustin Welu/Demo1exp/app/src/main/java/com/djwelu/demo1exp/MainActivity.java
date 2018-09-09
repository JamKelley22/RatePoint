package com.djwelu.demo1exp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.os.Handler;
import android.os.SystemClock;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    TextView timeview;
    Button startbutton, stopbutton;
    Handler hand;
    long startTime, stopTime;
    boolean stateCounting = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        timeview = (TextView) findViewById(R.id.timeview);
        startbutton = (Button) findViewById(R.id.startbutton);
        stopbutton = (Button) findViewById(R.id.stopbutton);
        hand = new Handler();

        startbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startTime = SystemClock.uptimeMillis();
                stateCounting = true;
            }
        });

        stopbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopTime = SystemClock.uptimeMillis();
                stateCounting = false;
            }
        });
    }

    public Runnable runnable = new Runnable() {
        public void run() {

        }
    };

}
