//
//  ViewController.swift
//  WhatTheBell
//
//  Created by Richard Ni on 2017-10-21.
//  Copyright © 2017 Richard Ni. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func ring(_ sender: UIButton) {
        let url = URL(string: "http://localhost:5000/ring/")
        
        let config = URLSessionConfiguration.default
        
        let request = NSMutableURLRequest(url: url!)
        
        request.httpMethod = "POST"
        
        let bodyData = "email=Test@test.com&password=Test1234"
        
        request.httpBody = bodyData.data(using: String.Encoding.utf8);
        
        let session = URLSession(configuration: config)
        
        let task = session.dataTask(with: url! as URL, completionHandler: {(data, response, error) in
        })
        
        task.resume()
    }

}

