package com.example.demo.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.Model.Seller;
import com.example.demo.VO.SellerVo;
import com.example.demo.service.SellerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/*

 @Column(name = "portfolio", nullable = false)
    private String portfolio;

    @Column(name = "sellerGrage", nullable = true)
    private float sumRate;

    @Column(name = "reviewCount", nullable = true)
    private Long reviewCount;

    @Column(name = "state", nullable = false)
    private String state;
    

*/

import lombok.RequiredArgsConstructor;
@RestController
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    @RequestMapping(value = "/sellers", method = RequestMethod.PUT) 
    public Seller insertSeller(@RequestBody SellerVo vo)  {
       return sellerService.insertSeller(vo);
    }
    @RequestMapping(value = "/sellers/{sellerId}", method = RequestMethod.POST) 
    public List<String> insertSellerImage(@RequestParam("file") MultipartFile files[], @PathVariable long sellerId) {
        System.out.println("String");
        System.out.println(files.length);
        //return null;
        return sellerService.insertImage(files, sellerId);
    }
    @RequestMapping(value = "/sellers", method = RequestMethod.GET) 
    public List<Seller> getSeller() {
        return sellerService.findAll();
    }
    @RequestMapping(value = "/sellers/{sellerId}", method = RequestMethod.GET) 
    public Map<String, Object> getSellerId(@PathVariable long sellerId) {
        Seller seller = sellerService.findById(sellerId).get();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("seller", seller);
        map.put("image", sellerService.getImageBySellerId(sellerId));
        return map;
    }
}