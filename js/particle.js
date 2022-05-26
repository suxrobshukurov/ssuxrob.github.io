"use strict";

function _classCallCheck(t, i) {
    if (!(t instanceof i))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function t(t, i) {
        for (var e = 0; e < i.length; e++) {
            var h = i[e];
            h.enumerable = h.enumerable || !1,
                h.configurable = !0,
                "value" in h && (h.writable = !0),
                Object.defineProperty(t, h.key, h)
        }
    }
    return function(i, e, h) {
        return e && t(i.prototype, e),
            h && t(i, h),
            i
    }
}();
! function(t) {
    var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
            setTimeout(t, 10)
        },
        e = void 0,
        h = void 0,
        s = void 0,
        a = void 0,
        n = void 0,
        o = void 0,
        r = void 0,
        d = void 0,
        c = void 0,
        m = void 0,
        l = void 0,
        g = void 0,
        v = void 0,
        u = void 0,
        x = void 0,
        f = void 0,
        p = void 0,
        y = void 0,
        M = void 0,
        w = void 0,
        I = void 0,
        _ = void 0,
        P = void 0,
        b = void 0,
        E = void 0,
        k = void 0,
        F = void 0,
        H = void 0,
        A = function() {
            function t(i) {
                _classCallCheck(this, t);
                var e = {};
                i && (i.nodeName ? (e = JSON.parse(JSON.stringify(i.dataset)),
                        "IMG" === i.nodeName ? e.image = i : e.wrapperElement = i) : e = i),
                    this.state = "stopped",
                    this.touches = [],
                    this.on("imageLoaded", this._onImageLoaded),
                    this._initImage(e)
            }
            return _createClass(t, [{
                    key: "on",
                    value: function(t, i) {
                        this.events = this.events || {},
                            this.events[t] = this.events[t] || [],
                            this.events[t].push(i)
                    }
                }, {
                    key: "emit",
                    value: function(t, i) {
                        var e = this.events[t];
                        if (e && e.length)
                            for (var h = 0; h < e.length; h++) {
                                var s = e[h];
                                s.call(this, i)
                            }
                    }
                }, {
                    key: "start",
                    value: function(t) {
                        var i = t || {};
                        this.initPosition = i.initPosition || this.initPosition,
                            this.initDirection = i.initDirection || this.initDirection,
                            this.canvas && (this.canvas.width = this.width,
                                this.canvas.height = this.height,
                                this.canvas.style.display = ""),
                            this._initOrigins(),
                            this._initParticles(),
                            "running" !== this.state && (this.state = "running",
                                this.disableInteraction || ("ontouchstart" in window || window.navigator.msPointerEnabled ? (document.body.addEventListener("touchstart", this._touchHandler),
                                    document.body.addEventListener("touchmove", this._touchHandler),
                                    document.body.addEventListener("touchend", this._clearTouches),
                                    document.body.addEventListener("touchcancel", this._clearTouches)) : (this.canvas.addEventListener("mousemove", this._mouseHandler),
                                    this.canvas.addEventListener("mouseout", this._clearTouches))),
                                this._animate())
                    }
                }, {
                    key: "stop",
                    value: function(t) {
                        var i = t || {};
                        this.fadePosition = i.fadePosition || this.fadePosition,
                            this.fadeDirection = i.fadeDirection || this.fadeDirection,
                            this._fade(),
                            document.body.removeEventListener("touchstart", this._touchHandler),
                            document.body.removeEventListener("touchmove", this._touchHandler),
                            document.body.removeEventListener("touchend", this._clearTouches),
                            document.body.removeEventListener("touchcancel", this._clearTouches),
                            this.canvas.removeEventListener("mousemove", this._mouseHandler),
                            this.canvas.removeEventListener("mouseout", this._clearTouches)
                    }
                }, {
                    key: "_animate",
                    value: function() {
                        var t = this;
                        "stopped" !== this.state ? (this._calculate(),
                            this._draw(),
                            i(function() {
                                return t._animate()
                            })) : this.emit("stopped")
                    }
                }, {
                    key: "_onImageLoaded",
                    value: function(t) {
                        this.imageWidth = this.image.naturalWidth || this.image.width,
                            this.imageHeight = this.image.naturalHeight || this.image.height,
                            this.imageRatio = this.imageWidth / this.imageHeight,
                            this.width = this.width || this.imageWidth,
                            this.height = this.height || this.imageHeight,
                            this.renderSize = (this.width + this.height) / 4,
                            this.srcImage && (this.srcImage.style.display = "none"),
                            this._initSettings(t),
                            this._initContext(t),
                            this._initResponsive(t),
                            this.start()
                    }
                }, {
                    key: "_initImage",
                    value: function(t) {
                        var i = this;
                        this.srcImage = t.image, !this.srcImage && t.imageId && (this.srcImage = document.getElementById(t.imageId)),
                            this.imageUrl = t.imageUrl || this.srcImage.src,
                            this.image = document.createElement("img"),
                            this.wrapperElement = t.wrapperElement || this.srcImage.parentElement,
                            this.image.onload = function() {
                                return i.emit("imageLoaded", t)
                            },
                            this.image.crossOrigin = "Anonymous",
                            t.addTimestamp && (/\?/.test(this.imageUrl) ? this.imageUrl += "&d=" + Date.now() : this.imageUrl += "?d=" + Date.now()),
                            this.image.src = this.imageUrl
                    }
                }, {
                    key: "_initContext",
                    value: function(t) {
                        this.canvas = t.canvas,
                            this.canvas || this.context || !this.wrapperElement || (this.canvas = document.createElement("canvas"),
                                this.wrapperElement.appendChild(this.canvas)),
                            this.convas && (this.convas.style.display = "none"),
                            this.context = t.context,
                            this.renderer = t.renderer || "default"
                    }
                }, {
                    key: "_defaultInitContext",
                    value: function(t) {
                        this.context = this.context || this.canvas.getContext("2d")
                    }
                }, {
                    key: "_webglInitContext",
                    value: function() {
                        this.context = this.context || this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl"),
                            this.fragmentShaderScript = "\n        void main(void) {\n         gl_FragColor = vec4(1, 1, 1, 0.7);\n        }\n      ",
                            this.vertexShaderScript = "\n        attribute vec3 vertexPosition;\n        vec3 offset = vec3(-5, 3, 100);\n        vec3 mirror = vec3(0.01, -0.01, 1);\n\n        uniform mat4 modelViewMatrix;\n        uniform mat4 perspectiveMatrix;\n\n        void main(void) {\n          gl_Position = perspectiveMatrix * modelViewMatrix * vec4(mirror * vertexPosition + offset, 1.0);\n          gl_PointSize = 1.0;\n        }\n      ",
                            this.context.viewport(0, 0, this.width, this.height);
                        var t = this.context.createShader(this.context.VERTEX_SHADER);
                        this.context.shaderSource(t, this.vertexShaderScript),
                            this.context.compileShader(t);
                        var i = this.context.createShader(this.context.FRAGMENT_SHADER);
                        this.context.shaderSource(i, this.fragmentShaderScript),
                            this.context.compileShader(i),
                            this.program = this.context.createProgram(),
                            this.context.attachShader(this.program, t),
                            this.context.attachShader(this.program, i),
                            this.context.linkProgram(this.program),
                            this.context.useProgram(this.program),
                            this.vertexPosition = this.context.getAttribLocation(this.program, "vertexPosition"),
                            this.context.enableVertexAttribArray(this.vertexPosition),
                            this.context.clearColor(0, 0, 0, 1),
                            this.context.clearDepth(1),
                            this.context.enable(this.context.BLEND),
                            this.context.disable(this.context.DEPTH_TEST),
                            this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE),
                            this.vertexBuffer = this.context.createBuffer(),
                            this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer),
                            this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
                        var e = this.width / this.height,
                            h = 1 * Math.tan(1 * Math.PI / 360),
                            s = -h,
                            a = h * e,
                            n = -a,
                            o = (a + n) / (a - n),
                            r = (h + s) / (h - s),
                            d = 2 / (a - n),
                            c = 2 / (h - s),
                            m = [d, 0, o, 0, 0, c, r, 0, 0, 0, 10001 / 9999, 2e4 / 9999, 0, 0, -1, 0],
                            l = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                            g = this.context.getAttribLocation(this.program, "vertexPosition");
                        this.context.vertexAttribPointer(g, 3, this.context.FLOAT, !1, 0, 0);
                        var v = this.context.getUniformLocation(this.program, "modelViewMatrix"),
                            u = this.context.getUniformLocation(this.program, "perspectiveMatrix");
                        this.context.uniformMatrix4fv(v, !1, new Float32Array(m)),
                            this.context.uniformMatrix4fv(u, !1, new Float32Array(l))
                    }
                }, {
                    key: "_initSettings",
                    value: function(t) {
                        this.width = 1 * t.width || this.width,
                            this.height = 1 * t.height || this.height,
                            this.maxWidth = t.maxWidth,
                            this.maxHeight = t.maxHeight,
                            this.minWidth = t.minWidth,
                            this.minHeight = t.minHeight,
                            this.maxWidth && (/%$/.test(this.maxWidth) ? this.maxWidth = this.width * this.maxWidth.replace("%", "") / 100 : this.maxWidth *= 1),
                            this.maxHeight && (/%$/.test(this.maxHeight) ? this.maxHeight = this.height * this.maxHeight.replace("%", "") / 100 : this.maxHeight *= 1),
                            this.minWidth && (/%$/.test(this.minWidth) ? this.minWidth = this.width * this.minWidth.replace("%", "") / 100 : this.minWidth *= 1),
                            this.minHeight && (/%$/.test(this.minHeight) ? this.minHeight = this.height * this.minHeight.replace("%", "") / 100 : this.minHeight *= 1),
                            this.alphaFade = .4,
                            this.gravity = 1 * t.gravity || .08,
                            this.particleGap = 1 * t.particleGap || 3,
                            this.layerCount = t.layerCount || 1,
                            this.layerDistance = t.layerDistance || this.particleGap,
                            this.initPosition = t.initPosition || "random",
                            this.initDirection = t.initDirection || "random",
                            this.fadePosition = t.fadePosition || "none",
                            this.fadeDirection = t.fadeDirection || "none",
                            this.noise = isNaN(1 * t.noise) ? 10 : 1 * t.noise,
                            this.disableInteraction = t.disableInteraction,
                            this.mouseForce = 1 * t.mouseForce || 30,
                            this.color = t.color,
                            this.colorArr = t.colorArr || this.colorArr
                    }
                }, {
                    key: "_initResponsive",
                    value: function(t) {
                        var i = this;
                        this.responsiveWidth = this.wrapperElement && t.responsiveWidth,
                            this.responsiveWidth && (this.on("stopped", function() {
                                    i.width = i.wrapperElement.clientWidth,
                                        i.start()
                                }),
                                this.wrapperElement.addEventListener("resize", function() {
                                    i.width !== i.wrapperElement.clientWidth && i.stop()
                                }),
                                this.width = this.wrapperElement.clientWidth)
                    }
                }, {
                    key: "_calculate",
                    value: function() {
                        for (this.vertices = [],
                            h = 0,
                            s = 0; s < this.particles.length; s++) {
                            for (o = this.origins[s],
                                r = this.particles[s],
                                u = o.x - r.x + (Math.random() - .5) * this.noise,
                                x = o.y - r.y + (Math.random() - .5) * this.noise,
                                f = o.z - r.z + (Math.random() - .5) * this.noise / 1e3,
                                p = Math.sqrt(u * u + x * x + f * f),
                                y = .01 * p,
                                r.vx += y * (u / p) * this.speed,
                                r.vy += y * (x / p) * this.speed,
                                r.vz += y * (f / p) * this.speed,
                                c = 0; c < this.touches.length; c++)
                                d = this.touches[c],
                                u = r.x - d.x,
                                x = r.y - d.y,
                                f = r.z - d.z,
                                p = Math.sqrt(u * u + x * x + f * f),
                                y = this.mouseForce * d.force / p,
                                r.vx += y * (u / p) * this.speed,
                                r.vy += y * (x / p) * this.speed,
                                r.vz += y * (f / p) * this.speed;
                            r.vx *= this.gravityFactor,
                                r.vy *= this.gravityFactor,
                                r.vz *= this.gravityFactor,
                                r.x += r.vx,
                                r.y += r.vy,
                                r.z += r.vz,
                                0 > r.x || r.x >= this.width || 0 > r.y || r.y >= this.height ? (r.isHidden = !0,
                                    "stopping" === this.state && (r.isDead = !0)) : ("stopping" !== this.state || r.isDead || h++,
                                    r.isHidden = !1),
                                this.vertices.push(r.x, r.y, r.z)
                        }
                        "stopping" === this.state && 0 === h && (this.state = "stopped")
                    }
                }, {
                    key: "_defaultRenderer",
                    value: function() {
                        for (this.depth = Math.max(this.layerDistance * this.layerCount / 2, this.mouseForce),
                            this.minZ = -this.depth,
                            this.maxZ = this.depth,
                            e = this.context.createImageData(this.width, this.height),
                            s = 0; s < this.origins.length; s++)
                            o = this.origins[s],
                            r = this.particles[s],
                            r.isDead || r.isHidden || (l = ~~r.x,
                                g = ~~r.y,
                                H = o.color[3],
                                this.alphaFade > 0 && this.layerCount > 1 && (v = Math.max(Math.min(r.z, this.maxZ), this.minZ) - this.minZ,
                                    H = H * (1 - this.alphaFade) + H * this.alphaFade * (v / (this.maxZ - this.minZ)),
                                    H = Math.max(Math.min(~~H, 255), 0)),
                                a = 4 * (l + g * this.width),
                                e.data[a + 0] = o.color[0],
                                e.data[a + 1] = o.color[1],
                                e.data[a + 2] = o.color[2],
                                e.data[a + 3] = H);
                        this.context.putImageData(e, 0, 0)
                    }
                }, {
                    key: "_webglRenderer",
                    value: function() {
                        I = new Float32Array(this.vertices),
                            this.context.lineWidth(2.6),
                            this.context.bufferData(this.context.ARRAY_BUFFER, I, this.context.DYNAMIC_DRAW),
                            this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT),
                            this.context.drawArrays(this.context.POINTS, 0, this.particles.length),
                            this.context.flush()
                    }
                }, {
                    key: "_initParticles",
                    value: function() {
                        for (this.particles = void 0,
                            this.particles = [],
                            s = 0; s < this.origins.length; s++)
                            o = this.origins[s],
                            r = {},
                            this._initParticlePosition(o, r),
                            this._initParticleDirection(r),
                            this.particles.push(r)
                    }
                }, {
                    key: "_initParticlePosition",
                    value: function(t, i) {
                        switch (i.z = 0,
                            this.initPosition) {
                            case "random":
                                i.x = Math.random() * this.width,
                                    i.y = Math.random() * this.height;
                                break;
                            case "top":
                                i.x = Math.random() * this.width * 3 - this.width,
                                    i.y = -Math.random() * this.height;
                                break;
                            case "left":
                                i.x = -Math.random() * this.width,
                                    i.y = Math.random() * this.height * 3 - this.height;
                                break;
                            case "bottom":
                                i.x = Math.random() * this.width * 3 - this.width,
                                    i.y = this.height + Math.random() * this.height;
                                break;
                            case "right":
                                i.x = this.width + Math.random() * this.width,
                                    i.y = Math.random() * this.height * 3 - this.height;
                                break;
                            case "misplaced":
                                i.x = t.x + Math.random() * this.width * .3 - .1 * this.width,
                                    i.y = t.y + Math.random() * this.height * .3 - .1 * this.height;
                                break;
                            default:
                                i.x = t.x,
                                    i.y = t.y
                        }
                    }
                }, {
                    key: "_fade",
                    value: function() {
                        for ("explode" === this.fadePosition || "top" === this.fadePosition || "left" === this.fadePosition || "bottom" === this.fadePosition || "right" === this.fadePosition ? this.state = "stopping" : this.state = "stopped",
                            s = 0; s < this.origins.length; s++)
                            o = origins[s],
                            this._fadeOriginPosition(this.origins[s]),
                            this._fadeOriginDirection(this.particles[s])
                    }
                }, {
                    key: "_fadeOriginPosition",
                    value: function(t) {
                        switch (this.fadePosition) {
                            case "random":
                                t.x = Math.random() * this.width * 2 - this.width,
                                    t.y = Math.random() * this.height * 2 - this.height,
                                    t.x > 0 && (t.x += this.width),
                                    t.y > 0 && (t.y += this.height);
                                break;
                            case "top":
                                t.x = Math.random() * this.width * 3 - this.width,
                                    t.y = -Math.random() * this.height;
                                break;
                            case "left":
                                t.x = -Math.random() * this.width,
                                    t.y = Math.random() * this.height * 3 - this.height;
                                break;
                            case "bottom":
                                t.x = Math.random() * this.width * 3 - this.width,
                                    t.y = this.height + Math.random() * this.height;
                                break;
                            case "right":
                                t.x = this.width + Math.random() * this.width,
                                    t.y = Math.random() * this.height * 3 - this.height
                        }
                    }
                }, {
                    key: "_initParticleDirection",
                    value: function(t) {
                        switch (t.vz = 0,
                            this.initDirection) {
                            case "random":
                                M = Math.random() * Math.PI * 2,
                                    w = Math.random(),
                                    t.vx = this.width * w * Math.sin(M) * .1,
                                    t.vy = this.height * w * Math.cos(M) * .1;
                                break;
                            case "top":
                                M = Math.random() * Math.PI - Math.PI / 2,
                                    w = Math.random(),
                                    t.vx = this.width * w * Math.sin(M) * .1,
                                    t.vy = this.height * w * Math.cos(M) * .1;
                                break;
                            case "left":
                                M = Math.random() * Math.PI + Math.PI,
                                    w = Math.random(),
                                    t.vx = this.width * w * Math.sin(M) * .1,
                                    t.vy = this.height * w * Math.cos(M) * .1;
                                break;
                            case "bottom":
                                M = Math.random() * Math.PI + Math.PI / 2,
                                    w = Math.random(),
                                    t.vx = this.width * w * Math.sin(M) * .1,
                                    t.vy = this.height * w * Math.cos(M) * .1;
                                break;
                            case "right":
                                M = Math.random() * Math.PI,
                                    w = Math.random(),
                                    t.vx = this.width * w * Math.sin(M) * .1,
                                    t.vy = this.height * w * Math.cos(M) * .1;
                                break;
                            default:
                                t.vx = 0,
                                    t.vy = 0
                        }
                    }
                }, {
                    key: "_fadeOriginDirection",
                    value: function(t) {
                        switch (this.fadeDirection) {
                            case "random":
                                M = Math.random() * Math.PI * 2,
                                    w = Math.random(),
                                    t.vx += this.width * w * Math.sin(M) * .1,
                                    t.vy += this.height * w * Math.cos(M) * .1;
                                break;
                            case "top":
                                M = Math.random() * Math.PI - Math.PI / 2,
                                    w = Math.random(),
                                    t.vx += this.width * w * Math.sin(M) * .1,
                                    t.vy += this.height * w * Math.cos(M) * .1;
                                break;
                            case "left":
                                M = Math.random() * Math.PI + Math.PI,
                                    w = Math.random(),
                                    t.vx += this.width * w * Math.sin(M) * .1,
                                    t.vy += this.height * w * Math.cos(M) * .1;
                                break;
                            case "bottom":
                                M = Math.random() * Math.PI + Math.PI / 2,
                                    w = Math.random(),
                                    t.vx += this.width * w * Math.sin(M) * .1,
                                    t.vy += this.height * w * Math.cos(M) * .1;
                                break;
                            case "right":
                                M = Math.random() * Math.PI,
                                    w = Math.random(),
                                    t.vx += this.width * w * Math.sin(M) * .1,
                                    t.vy += this.height * w * Math.cos(M) * .1;
                                break;
                            default:
                                t.vx = 0,
                                    t.vy = 0
                        }
                    }
                }, {
                    key: "_initOrigins",
                    value: function() {
                        for (_ = document.createElement("canvas"),
                            this.responsiveWidth && (this.width = this.wrapperElement.clientWidth),
                            this.ratio = Math.min(this.width, this.maxWidth || Number.POSITIVE_INFINITY) / Math.min(this.height, this.maxHeight || Number.POSITIVE_INFINITY),
                            this.ratio < this.imageRatio ? (this.renderWidth = ~~Math.min(this.width || Number.POSITIVE_INFINITY, this.minWidth || this.imageWidth || Number.POSITIVE_INFINITY, this.maxWidth || Number.POSITIVE_INFINITY),
                                this.renderHeight = ~~(this.renderWidth / this.imageRatio)) : (this.renderHeight = ~~Math.min(this.height || Number.POSITIVE_INFINITY, this.minHeight || this.imageHeight || Number.POSITIVE_INFINITY, this.maxHeight || Number.POSITIVE_INFINITY),
                                this.renderWidth = ~~(this.renderHeight * this.imageRatio)),
                            this.offsetX = ~~((this.width - this.renderWidth) / 2),
                            this.offsetY = ~~((this.height - this.renderHeight) / 2),
                            _.width = this.renderWidth,
                            _.height = this.renderHeight,
                            P = _.getContext("2d"),
                            P.drawImage(this.image, 0, 0, this.renderWidth, this.renderHeight),
                            b = P.getImageData(0, 0, this.renderWidth, this.renderHeight).data,
                            this.origins = void 0,
                            this.origins = [],
                            l = 0; l < this.renderWidth; l += this.particleGap)
                            for (g = 0; g < this.renderHeight; g += this.particleGap)
                                if (s = 4 * (l + g * this.renderWidth),
                                    (H = b[s + 3]) > 0)
                                    if (this.colorArr)
                                        for (n = 0; n < this.layerCount; n++)
                                            this.origins.push({
                                                x: this.offsetX + l,
                                                y: this.offsetY + g,
                                                z: n * this.layerDistance - this.layerCount * this.layerDistance / 2,
                                                color: this.colorArr
                                            });
                                    else
                                        for (E = b[s],
                                            k = b[s + 1],
                                            F = b[s + 2],
                                            n = 0; n < this.layerCount; n++)
                                            this.origins.push({
                                                x: this.offsetX + l,
                                                y: this.offsetY + g,
                                                z: n * this.layerDistance - this.layerCount * this.layerDistance / 2,
                                                color: [E, k, F, H]
                                            });
                        this.speed = Math.log(this.origins.length) / 10,
                            this.gravityFactor = 1 - this.gravity * this.speed
                    }
                }, {
                    key: "_parseColor",
                    value: function(t) {
                        var i = void 0;
                        if ("string" == typeof t) {
                            var e = t.replace(" ", "");
                            if (i = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(e))
                                i = [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)];
                            else if (i = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(e))
                                i = [17 * parseInt(i[1], 16), 17 * parseInt(i[2], 16), 17 * parseInt(i[3], 16)];
                            else if (i = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(e))
                                i = [+i[1], +i[2], +i[3], +i[4]];
                            else {
                                if (!(i = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(e)))
                                    return;
                                i = [+i[1], +i[2], +i[3]]
                            }
                            return i
                        }
                    }
                }, {
                    key: "renderer",
                    get: function() {
                        return this._renderer
                    },
                    set: function(t) {
                        this._renderer = t,
                            this._draw = this["_" + t + "Renderer"];
                        try {
                            this["_" + t + "InitContext"]()
                        } catch (i) {
                            console.log(i),
                                "default" !== t && (this.renderer = "default")
                        }
                    }
                }, {
                    key: "color",
                    set: function(t) {
                        this.colorArr = this._parseColor(t),
                            this.colorArr && (isNaN(this.colorArr[3]) && (this.colorArr[3] = 255),
                                0 < this.colorArr[3] && this.colorArr[3] <= 1 && (this.colorArr[3] *= 255))
                    }
                }, {
                    key: "_mouseHandler",
                    get: function() {
                        var t = this;
                        return function(i) {
                            t.touches = [{
                                x: i.offsetX,
                                y: i.offsetY,
                                z: 0,
                                force: 1
                            }]
                        }
                    }
                }, {
                    key: "_touchHandler",
                    get: function() {
                        var t = this;
                        return function(i) {
                            for (t.touches = [],
                                m = t.canvas.getBoundingClientRect(),
                                c = 0; c < i.changedTouches.length; c++)
                                d = i.changedTouches[c],
                                d.target === t.canvas && (t.touches.push({
                                        x: d.pageX - m.left,
                                        y: d.pageY - m.top,
                                        z: 0,
                                        force: d.force || 1
                                    }),
                                    i.preventDefault())
                        }
                    }
                }, {
                    key: "_clearTouches",
                    get: function() {
                        var t = this;
                        return function(i) {
                            t.touches = []
                        }
                    }
                }]),
                t
        }();
    t.NextParticle = A;
    for (var D = document.getElementsByClassName("next-particle"), T = 0; T < D.length; T++) {
        var W = D[T];
        W.nextParticle = new A(W)
    }
}(window)