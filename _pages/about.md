---
title: About
permalink: "/about"
layout: page
comments: true
---

<div class="row justify-content-between">
<div class="col-md-8 pr-5">

<h1>Martin Qian</h1>
<p class="lead">VP of Engineering at Dedrone | Tech Leader | Driving Innovation in Drone Defense Technology</p>

<p>I'm a technology leader with a passion for solving complex, real-world problems through innovative engineering solutions. Currently serving as VP of Engineering at <a href="https://www.dedrone.com" target="_blank">Dedrone</a> (now part of Axon), I lead teams building cutting-edge technology that protects people and infrastructure by detecting, tracking, and mitigating aerial threats in real time.</p>

<h3>What I Do</h3>

<p>At Dedrone, I oversee the development of AI-driven systems that provide comprehensive airspace security solutions. Our technology operates at the intersection of machine learning, real-time systems, and RF engineering to solve some of the most challenging problems in drone defense.</p>

<p>I'm actively building world-class engineering teams across multiple disciplines:</p>
<ul>
<li><strong>Machine Learning Engineers</strong> - Developing AI systems for real-time detection, tracking, and optimization</li>
<li><strong>Full-Stack Engineers</strong> - Building operator platforms for managing complex, high-stakes scenarios</li>
<li><strong>C++ Engineers</strong> - Writing ultra-low-latency code for scalable, real-time systems</li>
<li><strong>RF Engineers</strong> - Designing advanced detection and mitigation technologies</li>
</ul>

<h3>Experience</h3>

<p>My career has been focused on building technology that makes a tangible impact:</p>

<p><strong>Previous Experience:</strong> Before joining Dedrone, I held key leadership roles at major tech companies including Snap and Amazon, where I developed expertise in large-scale systems, product development, and team leadership.</p>

<p><strong>Leadership Philosophy:</strong> I believe in creating environments where engineers can do their best work while solving problems that matter. Great technology comes from great teams, and great teams require clear vision, strong execution, and a culture that values both innovation and accountability.</p>

<h3>Why This Work Matters</h3>

<p>The challenges we're solving at Dedrone aren't just technical exercises—they're critical security problems with immediate, real-world impact. As unmanned aerial systems become more prevalent, the need for sophisticated detection and mitigation technology becomes increasingly important for protecting critical infrastructure, events, and public spaces.</p>

<p>Our engineering work directly contributes to public safety and national security, making it some of the most meaningful and impactful technology development happening today.</p>

<h3>Thoughts on Technology & Leadership</h3>

<p>Through this blog, I share insights on:</p>
<ul>
<li>Building and leading high-performing engineering teams</li>
<li>The intersection of AI/ML and real-time systems</li>
<li>Lessons learned from scaling technology organizations</li>
<li>Industry trends in defense technology and autonomous systems</li>
<li>Management philosophy and engineering culture</li>
</ul>

<h3>Let's Connect</h3>

<p>I'm always interested in connecting with fellow technology leaders, talented engineers, and anyone working on problems that matter. Whether you're interested in joining our team, discussing industry trends, or exploring potential collaborations, feel free to reach out.</p>

<p>You can find me on <a href="https://www.linkedin.com/in/martinqian/" target="_blank">LinkedIn</a> or connect through the contact information below.</p>

</div>

<div class="col-md-4">

<div class="sticky-top sticky-top-80">

<h5>Current Role</h5>
<p><strong>VP of Engineering</strong><br>
<a href="https://www.dedrone.com" target="_blank">Dedrone (Axon)</a><br>
Sterling, VA | Seattle, WA</p>

<h5>Focus Areas</h5>
<ul class="list-unstyled">
<li>• Drone Defense Technology</li>
<li>• Real-time AI/ML Systems</li>
<li>• Engineering Leadership</li>
<li>• Team Building & Culture</li>
<li>• Product Strategy</li>
</ul>

<h5>Hiring</h5>
<p>We're actively building our team! If you're passionate about solving complex technical challenges with real-world impact, I'd love to hear from you.</p>

<a href="https://www.linkedin.com/in/martinqian/" target="_blank" class="linkedin-button">
    <i class="fab fa-linkedin"></i> Connect on LinkedIn
</a>

<style>
.linkedin-button {
    display: inline-block;
    background-color: #0077B5;
    color: white !important;
    padding: 10px 16px;
    border-radius: 4px;
    text-decoration: none !important;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.33;
    text-align: center;
    transition: background-color 0.2s ease;
    margin-bottom: 1rem;
    border: none;
    cursor: pointer;
}

.linkedin-button:hover {
    background-color: #005885;
    color: white !important;
    text-decoration: none !important;
}

.linkedin-button i {
    margin-right: 8px;
    font-size: 16px;
}
</style>

<h5>Recent Posts</h5>
<div class="border-top pt-3 mt-3">
{% for post in site.posts limit:3 %}
    {% unless post.hidden == true %}
    <div class="mb-3">
        <h6 class="mb-1">
            <a href="{{ site.baseurl }}{{ post.url }}" class="text-decoration-none">{{ post.title }}</a>
        </h6>
        <small class="text-muted">{{ post.date | date: "%B %-d, %Y" }}</small>
    </div>
    {% endunless %}
{% endfor %}
</div>

</div>
</div>
</div>
